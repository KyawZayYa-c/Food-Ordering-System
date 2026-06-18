const express = require('express');
const orderController = require('../controllers/orderController.js');

const routes = express.Router();

routes.post('/', orderController.placeOrder);
routes.get('/all', orderController.getAllOrders);
routes.get('/:id', orderController.getOrder);
routes.get('/my-order', orderController.getMyOrders);
routes.patch('/:id/status', orderController.updateStatus);

module.exports = routes;

