import DB from "../data.js"

export default async (options,data)=>DB.GetData(data[options.field])