const jwt_secret = "EZ2SHOviGLTOIXaK"

const routes = [
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
					port:20110,
					path:"/auth/login",
					url:"localhost"
				}
			},
			{
				name:"checkfield",
				options:{field:"id"}
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
					port:22001,
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
					port:22001,
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
					port:20110,
					path:"/auth",
					url:"localhost"
				}
			},
			{
				name:"checkfield",
				options:{field:"id"}
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
					port:22001,
					path:"/api/decode",
					data:{
						secret: jwt_secret
					}
				}
			},			
			{
				name:"req",
				options:{
					port:20110,
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
]

const web = {
	port: 20000,
	root: "auth"
}

export {
	web,
	routes
}