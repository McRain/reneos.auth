import http from "http"

import { app as Config, tag } from './config.js'

import Worker from "./worker.js";

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

class Server {
    static get Port() {
        return Config.port
    }

    static get Server() {
        return _server
    }

    static get Now(){
		return new Date().toLocaleString()
	}

    static Start() {
        return new Promise((resolve, reject) => {
            try {
                _server.listen(Config.port, resolve)
                console.log(`${Server.Now} [${tag}] Start web on port ${Config.port}`)
            } catch (error) {
                reject(error)
            }
        })

    }

    static AddRoute(path,handler){
        _routes[path]=handler
    }

    static RemoveRoute(path){
        delete _routes[path]
    }

    static OnRequest(req, res) {
        try {
            const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
            req.path = parsedUrl.pathname
            if(!_routes[req.path]){
                console.warn(`No route ${req.path}`)
                res.writeHead(404).end()
                req.destroy()
                return
            }
            req.handler = _routes[req.path]
            req.query = Object.fromEntries(parsedUrl.searchParams.entries());
        } catch (error) {
            console.warn(`[${tag}] : ${error.message}`)
            req.query = {}
        }
        req.data = ''
        req.on('data', chunk => {
            if (req.data.length > Config.maxdata) {
                console.warn(`[${tag}] :Request Entity Too Large`)
                res.writeHead(413, { 'Content-Type': 'text/plain' }).end('Request Entity Too Large')
                req.destroy()
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
            const result = await req.handler(req,res)
            console.log(result)
            res.writeHead(200)
            res.end(result)
            return
        } catch (error) {
            console.warn(`[${tag}] : ${error.message}`)
            res.writeHead(500).end()
            req.destroy()
            return
        }
    }
    static Destroy() {
        return new Promise((resolve) => {
            _server.close(resolve);
        })

    }
}

const _server = http.createServer(Server.OnRequest)

export default Server