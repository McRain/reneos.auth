const jwt_secret = process.env.JWT_SECRET || "jwt_secret"
const jwt_port = process.env.JWT_PORT || 22001
const jwt_encode_path = process.env.JWT_ENCODEPATH || "/encode"
const jwt_decode_path = process.env.JWT_DECODEPATH || "/decode"
const jwt_expire = process.env.JWT_EXPIRE || '240h'

const _extauthport = process.env.EXT_PORT || 20110
const _ext_login = process.env.EXT_LOGIN || '/auth/login'
const _ext_auth = process.env.EXT_AUTH || '/auth'
const _ext_logout = process.env.EXT_LOGOUT || '/auth/logout'
const _ext_host = process.env.EXT_HOST || 'localhost'

const _tokencookie = process.env.TOKENCOOKIE || 'auth'

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
			//Read current token from cookie
			{
				name: "reqprops",
				options: {
					properties: ['cookie', _tokencookie]
				}
			},
			//Decode token by external service
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
			//Get stored data for ID
			{
				name: "getdata",
				options: {
					field: "id"
				}
			},
			//Verify 
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