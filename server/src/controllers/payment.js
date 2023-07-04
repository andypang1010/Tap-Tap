const socketio = require('socket.io')
const tabStatus = require('../models/tabStatus')

let apiFile = require('../api/env_api.json')
const stripe = require('stripe')(apiFile["stripe_private_test_key"])


function handleSocketPaymentEvents(socket) {

	socket.on('createCheckoutSession', async (data) => {
		try {
			const name = data.restaurantName;
            const table = data.table;

            let val = await JEAT.models.restaurant.getTab({
                username: name,
                table,
            });

            // Error flags
            if (val === -1) {
                socket.emit('error', `failed to get tab, table ${table} has no open tab`);
                return;
            }

            let line_items = [];
            for (let object of val) {
            	if (object.status !== tabStatus.PAYMENT_COMPLETED) {
	            	line_items.push({
    	        		price_data: {
        	    			currency: 'usd',
            				product_data: {
            					name: object.item.name,
            				},
            				unit_amount: object.item.price,
            			},
            			quantity: object.quantity,
            		});

            		object.status = tabStatus.PAYMENT_COMPLETED;
            	}
            }

            if (line_items === []) {
            	JEAT.logger.error('failed to checkout, no items to pay for');
            	socket.emit('error', `failed to checkout, no items to pay for`);
            	return;
            }

			const session = await stripe.checkout.sessions.create({
  				line_items,
  				mode: 'payment',
  				success_url: 'http://localhost:8008/success.html', // replace with url that checkout screen should pop up upon success
  				cancel_url: 'http://localhost:8008/cancel.html', // replace with the url that checkout screen should pop up upon cancelling
			});

			await JEAT.models.restaurant.setTab({
				username: name,
				table,
				tab: val || [],
			})

			socket.emit('checkoutSessionCreated', { url : session.url })
		} catch (e) {
			socket.emit('error', e.message)
		}
	})
}

module.exports = {
    handleSocketPaymentEvents
}