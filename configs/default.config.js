import {jwt,ext} from '../example.config.js'

const jwt_secret = "XlSklNDEtGXHpbkkX6ri7Fqj"

const _root  = ''

const routes = [
	//
	{
		path:`${_root}/auth/login`,
		workers:[
			{	
				name:"body",
				options:{}
			},
			{
				name:"req",
				options:{
					port:ext.port,
					path:ext.login_path,
					url:ext.host
				}
			},
			{
				name:"fieldsexists",
				options:{
					fields:["id"],
					returnresult:true
				}
			},
			{
				name:"setdata",
				options:{
					field: "id"
				}
			},
			{
				name:"req",
				options:{
					port:jwt.port,
					path:jwt.encode_path,
					data:{
						secret: jwt_secret,
						expire: jwt.expire
					}					
				}
			},
			{
				name:"setcookie",
				options:{
					name:"auth"
				}
			}
		]
	},
	{
		path:`${_root}/auth`,
		workers:[
			{
				name:"getcookie",
				options:{
					name:"auth"
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
				name:"getdata",
				options:{
					field: "id"
				}
			},
			{
				name:"extget",
				options:{
					port:ext.port,
					path:ext.auth_path,
					url:ext.host
				}
			},
			{
				name:"fieldsexists",
				options:{
					fields:["id"]
				}
			},
			{
				name:"sethead",
				options:{
					header:"X-User"
				}
			}
		]
	},
	{
		path:`${_root}/auth/logout`,
		workers:[
			{
				name:"getcookie",
				options:{
					name:"auth"
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
				name:"req",
				options:{
					port:ext.port,
					path:ext.logout_path,
					url:ext.host
				}
			},
			{
				name:"sethead",
				options:{
					header:"X-User"
				}
			}
		]
	}
	//
]

export {
	routes
}