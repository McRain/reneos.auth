

import Server from "./server.js"
import Worker from "./worker.js"

class App {
	static async Start() {
		await Worker.Start()
		await Server.Start()
	}
}

App.Start()