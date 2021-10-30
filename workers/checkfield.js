/**
 * Checks for the existence of the specified property and returns the entire object if the property is exists
 */
export default (options, data, res) => {
	if (data[options.field] !== null && data[options.field] !== undefined)
		return data
	res.writeHead(200)
	res.end()
}