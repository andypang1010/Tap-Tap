const path = require('path')
const autoload = require('auto-load')


module.exports = {
    async init() {
    JEAT.logger.info('=======================================')
    JEAT.logger.info(`start initializing the server `)
    JEAT.logger.info('=======================================')
    await this.preBootMaster();
    await this.bootMaster();
    },

    /**
     * the initialization (sanity checks) for server starts
     * */
    async preBootMaster(){
        //TODO
        JEAT.logger.info(`initialization steps before the server starts`)
        JEAT.db = await require(path.join(JEAT.SERVERPATH,"db/firebase")).init()
        JEAT.models = autoload(path.join(JEAT.SERVERPATH, 'models'))
    },

    /**
     * bootMaster process
     * */
    async bootMaster(){
        JEAT.logger.info(`start booting the server`)
        await require('../master')()
    },
}
