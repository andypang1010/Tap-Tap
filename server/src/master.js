const cors = require('cors')
const express = require('express')
const session = require('express-session')
const autoload = require('auto-load')
const path = require('path')
const compression = require('compression')

module.exports = async () => {
    const ctrl = autoload(path.join(JEAT.SERVERPATH, '/controllers'))

    const app = express()
    JEAT.app = app
    app.use(compression())

    // ----------------------------------------
    // Security
    // ----------------------------------------

    app.use(cors({ origin: false }))
    app.options('*', cors({ origin: false }))

    //TODO: add security middleware (portable from WIKI) to prevent XXS
    //app.use(mw.security)
    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use('/', ctrl.common)
    app.use('/auth', ctrl.auth)


    app.use((e, req, res) => {
        const err = e || 404
        res.status(err)
    })


    app.listen("8008",()=>{
        JEAT.logger.info("HTTP Server: [ RUNNING ]")
    })
}
