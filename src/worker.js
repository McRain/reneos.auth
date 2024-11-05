import { dirname } from 'path'

import { app,tag } from "./config.js"
import * as Modules from "./workers/index.js"

//import * as Api from './api/index.js'
import Server from './server.js'

class Worker {
    static get Now(){
		return new Date().toLocaleString()
	}
    static async Start() {
        for (let i = 0; i < app.configs.length; i++) {
            await Worker.BuildWorkers(app.configs[i])
        }
        /*Object.keys(Api).forEach(k => {
            console.log(`${Worker.Now} [${tag}] Add routes ${Object.keys(Api[k]).join(',')}`)
            WebServer.AddRoutes(Api[k])
        })*/
    }

    /**
     * 
     * @param {*} name 
     */
    static async BuildWorkers(name) {
        console.log(`${Worker.Now} Load '${name}' configuration `)
        const conf = await import(`./configs/${name}.js`)
        for (let i = 0; i < conf.routes.length; i++) {
            const { path, workers } = conf.routes[i]
            const names = []
            const handlers = []
            for (let i = 0; i < workers.length; i++) {
                const { name, options } = workers[i]
                handlers.push( Modules[name].bind(null, options))
                names.push(name)
            }
            const func = async (req, res) => {
                let value = req
                for (let i = 0; i < handlers.length; i++) {
                    try {
                        value = await handlers[i](value, req, res)
                    } catch (error) {
                        console.warn(error)
                        return
                    }
                    if (!value) {
                        if (i < handlers.length - 1)
                            console.log(`${Worker.Now} Step ${i} (${names[i]}) for ${req.url} return no value`)
                        return
                    }
                }
                return value
            }
            console.log(`${Worker.Now} Add route ${path}`)
            Server.AddRoute(path, func)
        }
    }

    static async Run(){

    }
}

export default Worker