const path = require('path')

console.log(process.env.NODE_ENV)
//the state of server, export as a global object
const JEAT = {
    IS_DEBUG: process.env.NODE_ENV == 'development', //configuration mode
    logger:require("./core/logger").init('JEAT'),
    kernel:require("./core/kernel"),
    config:require("./core/config")
}
global.JEAT = JEAT

JEAT.logger.info(`The server will be running in ${JEAT.IS_DEBUG?"development":"master"} mode`)

