const cors = require('cors')
const express = require('express')
const session = require('express-session')
const autoload = require('auto-load')
const path = require('path')
const compression = require('compression')
const http = require('http')
const { Server } = require('socket.io')

let apiFile = require('./api/env_api.json')
const stripe = require('stripe')(apiFile["stripe_private_test_key"])


module.exports = async () => {
    const ctrl = autoload(path.join(JEAT.SERVERPATH, '/controllers'))
    const port = 8008

    const app = express()
    JEAT.app = app
    app.use(compression())

    // ----------------------------------------
    // Security
    // ----------------------------------------

    app.use(cors({ origin: true }))
    // app.options('*', cors({ origin: false }))

    //TODO: add security middleware (portable from WIKI) to prevent XXS
    //app.use(mw.security)
    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use('/', ctrl.common)
    app.use('/auth', ctrl.auth)

    const server = http.createServer(app)
    const io = new Server(server);

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/socketTesting.html');
    });

    io.on('connection', (socket) => {
        JEAT.logger.info(`A client connected`)
        ctrl.socket.handleSocketEvents(socket);
        ctrl.payment.handleSocketPaymentEvents(socket);
    })

    server.listen(port, () => {
        JEAT.logger.info(`HTTP Server: [ RUNNING ON PORT ${port} ]`)
    })
}
