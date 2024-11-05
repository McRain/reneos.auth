export default (options,data,req,res)=>{
	console.log(`setcookie`)
	res.cookie[options.name] = {
		value: data,
		...options.mix
	}
	return {
		result:true
	}
}