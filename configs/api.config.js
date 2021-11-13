const jwt_secret = "3sEmPt2hUSLPQpVFe5KQT8Vu3iGLmzgm"
const jwt_port = 22001

const routes = [
	//
	{
		path:"/data",
		workers:[
			{	
				name:"gethead",
				options:{
					header:"apikey"
				}
			},
			{
				name:"req",
				options:{
					port:jwt_port,
					path:"/api/decode",
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
						"apis"
					]
				}
			},
			{
				name:"body",
				options:{}
			}
		]
	}
]

export {
	routes
}