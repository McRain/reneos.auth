/**
 * Read and return body or query
 */
export default (options,value,req,res)=>req.body	|| req.query