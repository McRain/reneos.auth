import * as Modules from "./workers/index.js"
import EventEmitter from "events"
import Server from './server.js'

const _emitter = new EventEmitter()

class Worker {
    static get Now() {
        return new Date().toLocaleString()
    }
    static async Start(config = {configs: []},mods) {
        for (let i = 0; i < config.configs.length; i++) {
            await Worker.BuildWorkers(config.configs[i],mods)
        }
    }

    /**
     * 
     * @param {*} name 
     */
    static async BuildWorkers(config, mods = {}) {
        for (let i = 0; i < config.routes.length; i++) {
            const { path, workers } = config.routes[i]
            const names = []
            const handlers = []
            for (let i = 0; i < workers.length; i++) {
                try {
                    const { name, options } = workers[i]
                    handlers.push(name in mods ? mods[name].bind(null, options) : Modules[name].bind(null, options))
                    names.push(name)
                } catch (error) {
                    _emitter.emit('error', error)
                }
            }
            const func = async (req, res) => {
                let value = {}
                for (let i = 0; i < handlers.length; i++) {
                    try {
                        value = await handlers[i](value, req, res)
                    } catch (error) {                        
                        _emitter.emit('error', error,path,i)
                        return
                    }
                    if (!value) {
                        if (i < handlers.length - 1) {
                            _emitter.emit('error', new Error(`${Worker.Now} Step ${i} (${names[i]}) for ${req.url} return no value`))
                        }
                        return
                    }
                }
                return value
            }
            Server.AddRoute(path, func)
        }
        _emitter.emit('ready')
    }
}

export default new Proxy(Worker, {
    get(target, prop) {
        if (prop in target)
            return target[prop]
        return _emitter[prop]
    }
})