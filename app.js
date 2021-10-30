import { dirname } from 'path'

import { WebServer } from "@reneos/server"

import { web, routes as Routes } from "./config.default.js"

import * as Api from './api/index.js'

console.logs = (...args) => {
	console.log(`${new Date().toLocaleString()} : ${args.join(' , ')}`)
}

class App {
	static async Start() {
		Object.keys(Api).forEach(k=>{
			WebServer.AddRoutes(Api[k])
		})
		for (let i = 0; i < Routes.length; i++) {
			const route = Routes[i]
			await App.BuildRoute(route)
		}
		WebServer.Run(web.port)
		console.logs(`Start web on port ${web.port}`)
	}

	static async BuildRoute(config) {
		const handlers = []
		for(let i=0;i<config.workers.length;i++){
			const {name,options} = config.workers[i]
			const module = await import(`${dirname(import.meta.url)}/workers/${name}.js`)
			const mod = module.default
			handlers.push(mod.bind(null, options))
		}
		const func = async (req, res) => {
			let value = req
			//const t = Date.now()
			for (let i = 0; i < handlers.length; i++) {
				//call result send to next handler				
				value = await handlers[i](value, res)
				//or if null - exit from loop
				if (!value) {		
					//console.logs(`${config.path} (${Date.now()-req.time}) ${Date.now()-t} ms`)
					return
				}
			}
			//console.logs(`${config.path} (${Date.now()-req.time}) ${Date.now()-t} ms`)
			return value
		}
		WebServer.AddRoute(config.path, func)
	}
}

App.Start()