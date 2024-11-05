import Server from "./server.js"
import Worker from "./worker.js"

class App {
	static async Start(config) {
		await Worker.Start(config.app)
		await Server.Start(config.web)
	}
}

export {
	App
}