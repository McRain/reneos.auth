import {routes as api, routes} from "./configs/api.config.js"
import {routes as main} from "./configs/default.config.js"

export default {
    web:{
        port:5000
    },
    app:{
        configs:[{
            routes:api
        },{
            routes:main
        }]
    }
}