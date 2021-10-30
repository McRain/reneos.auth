import DB from "../data.js"

export default (options,data)=>{
	const id = data[options.field]
	DB.SetData(id,data)
	return {id}
}