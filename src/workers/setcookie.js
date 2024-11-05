export default (options,data,req,res)=>{
	res.cookie[options.name] = {
		value: data,
		...options.mix
	}
	return {
		result:true
	}
}