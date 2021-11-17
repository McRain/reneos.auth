const jwt_secret = "XlSklNDEtGXHpbkkX6ri7Fqj"
const jwt_port = 22001
const jwt_encode_path = "/encode"
const jwt_decode_path = "/decode"
const jwt_expire = '240h'

const _extauthport = 20110
const _ext_login = '/auth/login'
const _ext_auth = '/auth'
const _ext_logout = '/auth/logout'
const _ext_host = 'localhost'

const _tokencookie = 'auth'

const routes = [
	{
		path: "/auth/login",
		workers: [
			{
				name: "reqprops",
				options: {
					properties: ['body']
				}
			},
			{
				name: "req",
				options: {
					port: _extauthport,
					path: _ext_login,
					url: _ext_host
				}
			},
			{
				name: "fieldsexists",
				options: {
					fields: ["id"],
					returnresult: true
				}
			},
			{
				name: "setdata",
				options: {
					field: "id"
				}
			},
			{
				name: "req",
				options: {
					port: jwt_port,
					path: jwt_encode_path,
					data: {
						secret: jwt_secret,
						expire: jwt_expire
					}
				}
			},
			{
				name: "setcookie",
				options: {
					name:_tokencookie,
					mix: {
						httpOnly: true,
						duration: 864000000
					}
				}
			}
		]
	},
	{
		path: "/auth",
		workers: [
			{
				name: "reqprops",
				options: {
					properties: ['cookie', _tokencookie]
				}
			},
			{
				name: "req",
				options: {
					port: jwt_port,
					path: jwt_decode_path,
					data: {
						secret: jwt_secret
					}
				}
			},
			{
				name: "getdata",
				options: {
					field: "id"
				}
			},
			{
				name: "extget",
				options: {
					port: _extauthport,
					path: _ext_auth,
					url: _ext_host
				}
			},
			{
				name: "fieldsexists",
				options: {
					fields: ["id"]
				}
			},
			{
				name: "sethead",
				options: {
					header: "X-User"
				}
			}
		]
	},
	{
		path: "/auth/logout",
		workers: [
			{
				name: "reqprops",
				options: {
					properties: ['cookie', _tokencookie]
				}
			},
			{
				name: "req",
				options: {
					port: jwt_port,
					path: jwt_decode_path,
					data: {
						secret: jwt_secret
					}
				}
			},
			{
				name: "req",
				options: {
					port: _extauthport,
					path: _ext_logout,
					url: _ext_host
				}
			},
			{
				name: "sethead",
				options: {
					header: "X-User"
				}
			}
		]
	}
]

export {
	routes
}