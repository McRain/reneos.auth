module.exports = {
  apps: [{
		name:"auth_app",
    script: "app.js",
    watch: ["*.js","*.json"],
    watch_delay: 1000,
    ignore_watch : ["node_modules"],
  }]
}