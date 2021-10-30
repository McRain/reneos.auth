export default (options,data,res)=>{
	const {login,password} = data.body.login?data.body:data.query
	return {
		login,password
	}
}