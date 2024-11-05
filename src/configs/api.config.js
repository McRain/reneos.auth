const jwt_secret = "XlSklNDEtGXHpbkkX6ri7Fqj"

const jwt={
	port:22001,
	encode_path:"/encode",
	decode_path:"/decode",
	expire:'240h'
}

const routes = [
	{
		path: "/api/*",
		workers:[
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