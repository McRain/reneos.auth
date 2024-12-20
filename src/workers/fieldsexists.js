/**
 * Checks for the existence of the specified property and returns the entire object if the property is exists
 */
export default (options,data,req,res) => {
	for(let i=0;i<options.fields.length;i++){
		const f = options.fields[i]
		if(f in data)
			continue		
		res.writeHead(200)
		res.end(JSON.stringify(options.returnresult?data:{}))
		return
	}
	return data
}