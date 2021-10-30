import http from 'http'

export default ({ url, path = '/',method='POST',port = 20121, credentials, headers },data)=>{
	const opt = {
		hostname: url,
		port,
		path,
		method,
		headers: {
			'Content-Type': 'application/json',
			"Accept": "application/json",
			'Content-Length': data.length,
			...headers || {}
		}
	}
	return new Promise((resolve, reject) => {
		const req = http.request(opt, (res) => {
			let result = ""
			res.setEncoding('utf8');
			res.on('data', chunk => result += chunk);
			res.on('end', () => {
				let rs
				try {
					rs = JSON.parse(result)
				} catch (error) {
					return reject(error)
				}
				resolve(rs)
			});
			res.on("error", (e) => {
				console.warn(r.message)
			})
		});
		req.on('error', (e) => {
			reject(e)
		});
		req.write(data);
		req.end();
	})
}