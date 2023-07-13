const socketio = require('socket.io')
const tabStatus = require('../../models/tabStatus')

module.exports = (socket) => {

    socket.on('updateStatus', async (data) => {
        try {
            const name = data.restaurantName;
            const table = data.table;
            const itemNumber = data.itemNumber;
            const newStatus = data.newStatus;
            if (!name || !table || (itemNumber === undefined) || !newStatus) {
                JEAT.logger.error(`failed to move item to status ${newStatus}, the query is undefined`);
                socket.emit(`failed to move item to status 'Order Prepared', the query is undefined`);
                return;
            }

            let val = await JEAT.models.restaurant.updateStatus({
                username: name,
                table,
                itemNumber,
                status: newStatus,
            });

            // Error flags
            if (val.error) {
                JEAT.logger.error(val.error);
                socket.emit('error', val.error);
                return;
            }

            socket.emit('statusUpdated', `Item ${itemNumber} at table ${table} moved from status ${val} to ${newStatus}`);
        } catch (e) {
            socket.emit('error', e.message);
        }
    })

    // get list of items on table's tab
    socket.on('getTab', async (data) => {
        try {
            const name = data.restaurantName;
            const table = data.table;
            if (!name || !table) {
                JEAT.logger.error('failed to get tab, the query is undefined');
                socket.emit('error', 'failed to get tab, the query is undefined');
                return;
            }

            let val = await JEAT.models.restaurant.getTab({
                username: name,
                table,
            });

            // Error flags
            if (val.error) {
                JEAT.logger.error(val.error);
                socket.emit('error', val.error);
                return;
            }

            socket.emit('tab', val);
        } catch (e) {
            socket.emit('error', e.message);
        }
    });

    // open table's tab
    socket.on('openTab', async (data) => {
        try {
            const name = data.restaurantName;
            const table = data.table;
            if (!name || !table) {
                JEAT.logger.error('failed to open tab, the query is undefined');
                socket.emit('error', 'failed to open tab, the query is undefined');
                return;
            }

            let val = await JEAT.models.restaurant.openTab({
                username: name,
                table,
            });

            // Error flags
            if (val.error) {
                JEAT.logger.error(val.error);
                socket.emit('error', val.error);
                return;
            }

            socket.emit('tabOpened', `Opened tab at table ${table}`);
        } catch (e) {
            socket.emit('error', e.message);
        }
    });

    // close table's tab
    socket.on('closeTab', async (data) => {
        try {
            const name = data.restaurantName;
            const table = data.table;
            if (!name || !table) {
                JEAT.logger.error('failed to close tab, the query is undefined');
                socket.emit('error', 'failed to close tab, the query is undefined');
                return;
            }

            let val = await JEAT.models.restaurant.closeTab({
                username: name,
                table,
            });

            // Warning flags
            if (val.warning) {
                JEAT.logger.warn(val.warning);
                socket.emit('warning', val.warning);
                return;
            }

            socket.emit('tabClosed', `Closed tab at table ${table}`);
        } catch (e) {
            socket.emit('error', e.message);
        }
    });

    /*
    add item to table's tab.
    options to specify item quantity (default: 1) and special instructions (default: "None")
    */
    socket.on('addToTab', async (data) => {
        try {
            const name = data.restaurantName;
            const table = data.table;
            const item = data.item;
            const quantity = data.quantity || 1;
            const instructions = data.specialInstructions || "None";
                
            if (!name || !table || !item) {
                JEAT.logger.error('failed to add to tab, the query is undefined');
                socket.emit('error', 'failed to add to tab, the query is undefined');
                return;
            }

            let val = await JEAT.models.restaurant.addToTab({
                username: name,
                table,
                item,
                quantity,
                instructions,
            });

            // Error flags
            if (val.error) {
                JEAT.logger.error(val.error);
                socket.emit('error', val.error);
                return;
            }

            socket.emit('itemAdded', `Added ${quantity} ${item} to tab at table ${table}`);
        } catch (e) {
            socket.emit('error', e.message);
        }
    });

    socket.on('cancelItem', async (data) => {
        try {
            const name = data.restaurantName;
            const table = data.table;
            const itemNumber = data.itemNumber;
            const quantity = data.quantity || 0;

            if (!name || !table || (itemNumber === undefined)) {
                JEAT.logger.error('failed to cancel item, the query is undefined');
                socket.emit('error', 'failed to cancel item, the query is undefined');
                return;
            }

            let val = await JEAT.models.restaurant.cancelItem({
                username: name,
                table,
                itemNumber,
                quantity,
            });

            // Error flags
            if (val.error) {
                JEAT.logger.error(val.error);
                socket.emit('error', val.error);
                return;
            }

        } catch (e) {
            socket.emit('error', e.message);
        }
    })

    socket.on('disconnect', () => {
        JEAT.logger.info('A client disconnected');
    });
}