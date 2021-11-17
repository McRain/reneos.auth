import request from "../request.js"

export default async (options,data,req,res) => {
	if (typeof data === "string") {
		return await request({
			url: "localhost",
			port: 80,
			path: "/auth",
			...options
		}, JSON.stringify(data))
	}
	return data

}