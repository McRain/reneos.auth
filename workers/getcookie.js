export default (options,data,req,res)=>{
	return req.cookie[options.name]
}