const paymentController = require('./payment');
const tabController = require('./tab');

module.exports = (socket) => {
  paymentController(socket);
  tabController(socket);
};