module.exports = {
  apps: [{
		name:"reneos_auth",
    script: "app.js",
    watch: ["*.js","*.json"],
    watch_delay: 3000,
    ignore_watch : ["node_modules"],
  }]
}