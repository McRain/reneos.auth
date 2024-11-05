import * as Modules from "./workers/index.js"

import Server from './server.js'

class Worker {
    static get Now(){
		return new Date().toLocaleString()
	}
    static async Start(config={
        configs:[]
    }) {
        for (let i = 0; i < config.configs.length; i++) {
            await Worker.BuildWorkers(config.configs[i])
        }
    }

    /**
     * 
     * @param {*} name 
     */
    static async BuildWorkers(config) {
        console.log(`${Worker.Now} Build configuration `)
        for (let i = 0; i < config.routes.length; i++) {
            const { path, workers } = config.routes[i]
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