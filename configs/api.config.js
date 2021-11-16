import {jwt} from '../example.config.js'

const jwt_secret = "XlSklNDEtGXHpbkkX6ri7Fqj"

const routes = [
	{
		path:"/api/*",
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