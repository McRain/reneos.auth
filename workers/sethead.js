export default (options,data,req,res) => {
	const h = JSON.stringify(data).replace(/[^a-z0-9 ,:{}/'"=-_.?!]/ig, '')
	res.setHeader(options.header, h)
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
	res.writeHead(200)
	res.end()
	return null
}