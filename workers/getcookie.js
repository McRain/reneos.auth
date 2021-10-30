export default (options,req,res)=>{
	return req.cookie[options.name]
}