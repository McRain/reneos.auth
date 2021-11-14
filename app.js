import { dirname } from 'path'

import { WebServer } from "@reneos/server"

import { web, app } from "./example.config.js"

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
		for (let i = 0; i < conf.routes.length; i++) {
			const { path, workers } = conf.routes[i]
			const handlers = []
			for (let i = 0; i < workers.length; i++) {
				const { name, options } = workers[i]
				const module = await import(`${dirname(import.meta.url)}/workers/${name}.js`)
				handlers.push(module.default.bind(null, options))
			}
			const func = async (req, res) => {
				let value = req
				for (let i = 0; i < handlers.length; i++) {
					value = await handlers[i](value, req, res)
					if (!value) {
						return
					}
				}
				return value
			}
			console.log(`${App.Now} Add route ${path}`)
			WebServer.AddRoute(path, func)
		}
	}
}

App.Start()