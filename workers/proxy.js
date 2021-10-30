import request from '../request.js'

export default async (options, data, res) => {
	const responce = await request({
		url: "localhost",
		port: 80,
		path: "/auth",
		...options
	}, JSON.stringify(data.body))
	if (responce.result === true)
		return responce.data
	const h = JSON.stringify(responce.data).replace(/[^a-z0-9 ,:{}'"=-_.?!]/ig, '')
	res.setHeader("X-User", h)
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
	res.writeHead(200)
	res.end()
}