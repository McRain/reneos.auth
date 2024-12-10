export default (options, data, req, res) => {
	let cook = `${options.name}=${typeof data==="string"?data:JSON.stringify(data)};httpOnly=${options.mix.httpOnly || 'true'};Path=${options.mix.path || '/'};`
	if (options.mix.duration) {
		cook = `${cook}expires=${new Date(Date.now() + options.mix.duration * 1000).toUTCString()};`
	}

	res.setHeader('Cookie', cook)
	res.setHeader('Set-Cookie', cook)
	return {
		result:true
	}
}