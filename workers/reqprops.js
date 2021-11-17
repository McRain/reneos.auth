export default (options,value,req,res)=>{
	let p = req
	for(let i=0;i<options.properties.length;i++){
		const prop = options.properties[i]
		p=p[prop]
	}
	return p
}