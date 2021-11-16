const web = {
	port: 20000
}

const app={
	//Load from ./configs/
	configs:[
		"default.config",
		"api.config"
	]
}

const jwt = {
	port:22001,
	encode_path:"/encode",
	decode_path:"/decode",
	expire:'240h'
}

const ext = {
	port:20110,
	login_path:'/auth/login',
	auth_path:'/auth',
	logout_path:'/auth/logout',
	host : 'localhost'
}

export {
	web,
	app,
	jwt,
	ext
}