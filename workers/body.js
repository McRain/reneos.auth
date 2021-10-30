/**
 * Read and return body or query
 */
export default (options,req)=>req.body	|| req.query