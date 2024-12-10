import http from "http"
import EventEmitter from "events"

const _emitter = new EventEmitter()

function BodyParse(req) {
    try {
        req.body = JSON.parse(typeof req.data === 'string' ? req.data : req.data.toString('utf8'))
    } catch (error) {
        req.body = {}
    }
}

function CookieParse(req) {
    req.cookie = {}
    if (req.headers.cookie) {
        try {
            req.headers.cookie.split(';').forEach(cookie => {
                const line = cookie.split('=');
                req.cookie[line.shift().trim()] = decodeURI(line.join('='));
            });
        } catch (error) {
            return
        }
    }
}

function Cors(req, res) {
    const origin = req.headers.origin
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin)
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            res.end()
            return true
        }
    }
    return false
}

const _routes = {}

const Config = {
    port: 5000,
    maxdata: 1024000
}

class Server {
    static get Port() {
        return _server.port
    }

    static get Server() {
        return _server
    }

    static get Now() {
        return new Date().toLocaleString()
    }

    static Start(config = {}) {
        Object.keys(config).forEach(k => {
            Config[k] = config[k]
        })
        return new Promise((resolve, reject) => {
            try {
                _server.listen(Config.port, resolve)
            } catch (error) {
                reject(error)
            }
        })

    }

    static AddRoute(path, handler) {
        _routes[path] = handler
    }

    static RemoveRoute(path) {
        delete _routes[path]
    }

    static OnRequest(req, res) {
        try {
            const parsedUrl = new URL(req.url || '/', `${req.protocol || 'http'}://${req.headers.host || 'localhost'}`)
            req.path = parsedUrl.pathname || '/'
            if (!_routes[req.path]) {
                res.writeHead(404).end()
                req.destroy()
                return
            }
            req.query = Object.fromEntries(parsedUrl.searchParams.entries());
        } catch (error) {
            req.query = {}
        }
        req.data = ''
        req.on('data', chunk => {
            if (req.data.length > Config.maxdata) {
                res.writeHead(413, { 'Content-Type': 'text/plain' }).end('Request Entity Too Large')
                req.destroy()
                _emitter.emit('error',new Error('Request Entity Too Large'))
                return
            }
            req.data += chunk
        })
        req.on('end', Server.OnRequestReady.bind(null, req, res))
    }

    static async OnRequestReady(req, res) {
        try {
            if (Cors(req, res)) {
                return
            }
            BodyParse(req)
            CookieParse(req)
            const result = await _routes[req.path](req, res)
            if (!result) {
                return
            }
            const isJson = typeof result === 'object';
            if (isJson) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } else  {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(result);
            }

        } catch (error) {
            res.writeHead(500).end()
            req.destroy()
            _emitter.emit('error',error)
        }
    }
    static Destroy() {
        return new Promise((resolve) => {
            _server.close(resolve);
        })
    }
}

const _server = http.createServer(Server.OnRequest)

export default new Proxy(Server, {
    get(target, prop) {
        if (prop in target)
            return target[prop]
        return _emitter[prop]
    }
})