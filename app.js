import { dirname } from 'path'

import { WebServer } from "@reneos/server"

import { web, app } from "./config.js"

import * as Api from './api/index.js'

class App {

	static get Now(){
		return new Date().toLocaleString()
	}

	static async Start() {

		for (let i = 0; i < app.configs.length; i++) {
			await App.BuildWorkers(app.configs[i])
		}

		Object.keys(Api).forEach(k => {
			console.log(`${App.Now} Add routes ${Object.keys(Api[k]).join(',')}`)
			WebServer.AddRoutes(Api[k])
		})

		WebServer.Run(web.port,{multiroutes:true})

		console.log(`${App.Now} Start web on port ${web.port}`)
	}


	static async BuildWorkers(name) {
		console.log(`${App.Now} Load '${name}' configuration `)
		const conf = await import(`${dirname(import.meta.url)}/configs/${name}.js`)
		const routs = conf.routes

		for (let i = 0; i < routs.length; i++) {
			const { path, workers } = routs[i]
			const handlers = []
			for (let i = 0; i < workers.length; i++) {
				const { name, options } = workers[i]
				const module = await import(`${dirname(import.meta.url)}/workers/${name}.js`)
				const mod = module.default
				handlers.push(mod.bind(null, options))
			}
			const func = async (req, res) => {
				const t = Date.now()
				let value = req
				for (let i = 0; i < handlers.length; i++) {
					//call result send to next handler	
					value = await handlers[i](value, req, res)
					if (app.debug) {
						console.log(value)
					}
					//or if null - exit from loop
					if (!value) {
						//res.writeHead(200)
						//res.end('{}')
						return
					}
				}
				if (app.debug) {
					const hr = process.hrtime(req.hrtime)
					console.log(`${App.Now} Request ${path} time ${Date.now() - t} ms`, hr[0], hr[1] / 1000000)
				}
				return value
			}
			console.log(`${App.Now} Add route ${path}`)
			WebServer.AddRoute(path, func)
		}
	}
}

App.Start()