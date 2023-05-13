const path = require('path')


//the state of server, export as a global object
const JEAT = {
    logger:require("./core/logger").init('MASTER'),
    kernel:require("./core/kernel"),
    config:require(".core/config")
}

global.JEAT = JEAT
