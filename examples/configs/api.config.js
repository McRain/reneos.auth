const jwt_secret = process.env.JWT_SECRET_API || "jwt_secret"
const jwt_port = process.env.JWT_PORT_API || 22001

const jwt={
	port:jwt_port,
	encode_path:"/encode",
	decode_path:"/decode",
	expire:'240h'
}

const routes = [
	{
		path: "/api/*",
		workers:[
			{	
				name:"mymodule",
				options:{
					"optionkey":"optionvalue"
				}
			},
			{	
				name:"reqprops",
				options:{
					properties:['headers','apikey']
				}
			},
			{
				name:"req",
				options:{
					port:jwt.port,
					path:jwt.decode_path,
					data:{
						secret: jwt_secret
					}
				}
			},
			{
				name:"inlist",
				options:{
					field:"id",
					list:[
						"apidev"
					]
				}
			},
			{
				name:"reqprops",
				options:{
					properties:['body']
				}
			}
		]
	}
]

export {
	routes
}