
import Config from "./config.js"
import {App} from "../src/index.js"
//Your module
import MyModule from "./mymods/mymodule.js"


console.log('Prepare')

App.Start(Config,{
    "mymodule":MyModule
})

console.log(`Started at port ${Config.web.port}`)