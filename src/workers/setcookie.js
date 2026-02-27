export default (options, data, req, res) => {
	const httpOnly = options.mix.httpOnly !== false ? '; HttpOnly' : ''
	let cook = `${options.name}=${typeof data==="string"?data:JSON.stringify(data)}; Path=${options.mix.path || '/'}${httpOnly};`
	if (options.mix.duration) {
		cook = `${cook}expires=${new Date(Date.now() + options.mix.duration * 1000).toUTCString()};SameSite=None; Secure;`
	}
	res.setHeader('Set-Cookie',cook)
	return {
		result:true
	}
}