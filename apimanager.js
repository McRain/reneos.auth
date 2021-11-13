class ApiManager{
	static Init(routes,options){

	}

	static Add(routes,handler){
		Object.keys(Api).forEach(k => {
			WebServer.AddRoutes(Api[k])
		})
	}
}

export default ApiManager