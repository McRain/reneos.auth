import request from '../request.js'

export default (options,data,req,res) => {
	return request({
		url: "localhost",
		port: 80,
		path: "/",
		...options
	}, JSON.stringify(data.body))
}