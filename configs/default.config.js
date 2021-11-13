const jwt_secret = "EZ2SHOviGLTOIXaK"
const jwt_port = 22001

const _extauthport = 20110

const routes = [
	//
	{
		path:"/auth/login",
		workers:[
			{	
				name:"body",
				options:{}
			},
			{
				name:"req",
				options:{
					port:_extauthport,
					path:"/auth/login",
					url:"localhost"
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
					port:jwt_port,
					path:"/api/encode",
					data:{
						secret: jwt_secret,
						exp: "240h"
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
		path:"/auth",
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
					port:jwt_port,
					path:"/api/decode",
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
					port:_extauthport,
					path:"/auth",
					url:"localhost"
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
		path:"/auth/logout",
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
					port:jwt_port,
					path:"/api/decode",
					data:{
						secret: jwt_secret
					}
				}
			},			
			{
				name:"req",
				options:{
					port:_extauthport,
					path:"/auth/logout",
					url:"localhost"
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