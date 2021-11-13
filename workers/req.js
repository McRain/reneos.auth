import request from "../request.js"

export default async (options,data,req,res) => {
	let values = {
		...options.data
	}
	if(typeof data==="string")
		values.data = data
	else
		values = {...values,...data}
	const resp =  await request({
		url: "localhost",
		port: 80,
		path: "/auth",
		...options
	}, JSON.stringify(values))
	return options.field?resp[options.field]:resp
}