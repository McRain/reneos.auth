

export default (options,value,req,res)=>{
	return req.headers[options.header]
}