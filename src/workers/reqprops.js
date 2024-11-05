export default (options,value,req,res)=>{
	console.log(`reqprops`)
	let p = req
	for(let i=0;i<options.properties.length;i++){
		const prop = options.properties[i]
		if(prop in p)
			p=p[prop]
	}
	return p
}