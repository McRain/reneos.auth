/**
 * Checks for the existence of the specified property and returns the entire object if the property is exists
 */
 export default (options,data,req,res) => {
	const value = data[options.field]
	if(options.list.includes(value)){
		return data
	}
	res.writeHead(200)
	res.end('{}')
}