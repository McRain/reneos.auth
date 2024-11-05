import request from "../request.js"

export default async (options, data, req, res) => {
	console.log(`req`,options,data)
	let values = {
		...options.data
	}
	if (typeof data === "string")
		values.data = data
	else
		values = { ...values, ...data }
	try {
		const resp = await request({
			url: "localhost",
			port: 80,
			path: "/auth",
			...options
		}, JSON.stringify(values))
		return options.field ? resp[options.field] : resp
	} catch (error) {
		return
	}
}