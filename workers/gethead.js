export default (options,data,req,res)=>{
	return req.headers[options.header]
}