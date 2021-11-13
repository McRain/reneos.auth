import DB from "../data.js"

export default async (options,data,req,res)=>DB.GetData(data[options.field])