import Server from "./server.js"
import Worker from "./worker.js"
import Data from "./data.js"

class App {
	static async Start(config,mods) {
		await Worker.Start(config.app,mods)
		await Server.Start(config.web)
	}
}

export {
	App,Worker,Server,Data
}