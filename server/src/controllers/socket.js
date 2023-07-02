const socketio = require('socket.io')

function handleSocketEvents(socket) {

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
            if (val === -1) {
                socket.emit('error', `failed to get tab, table ${table} has no open tab`);
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

            console.log("Got to opentab")

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
            if (val === -1) {
                socket.emit('error', `failed to open tab, table ${table} is already occupied`);
                return;
            } else if (val === -2) {
                socket.emit('error', 'failed to open tab, restaurant or table is not valid');
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

            // Warning flags
            if (await JEAT.models.restaurant.closeTab({ username: name, table }) === 1) {
                socket.emit('tabClosed', `No tab to close at table ${table}`);
                return;
            }

            socket.emit('tabClosed', `Closed tab at table ${table}`);
        } catch (e) {
            socket.emit('error', e.message);
        }
    });

    // add to table's tab
    socket.on('addToTab', async (data) => {
        try {
            const name = data.restaurantName;
            const table = data.table;
            const item = data.item;
                if (!name || !table || !item) {
                JEAT.logger.error('failed to add to tab, the query is undefined');
                socket.emit('error', 'failed to add to tab, the query is undefined');
                return;
            }

            let val = await JEAT.models.restaurant.addToTab({
                username: name,
                table,
                item,
            });

            // Error flags
            if (val === -1) {
                socket.emit('error', `failed to add to tab, no tab open at table ${table}`);
                return;
            } else if (val === -2) {
                socket.emit('error', `failed to add to tab, item ${item} not on the menu`);
                return;
            }

            socket.emit('itemAdded', `Added x1 ${item} to tab at table ${table}`);
        } catch (e) {
            socket.emit('error', e.message);
        }
    });

    socket.on('disconnect', () => {
        JEAT.logger.info('A client disconnected');
    });
}

module.exports = {
    handleSocketEvents
}