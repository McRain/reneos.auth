export default (options,data,req,res)=>{
	res.cookie[options.name] = {
		value: data,
		httpOnly: true,
		duration: 864000000
	}
	return {
		result:true
	}
}