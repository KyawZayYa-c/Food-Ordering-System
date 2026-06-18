const express = require('express');
const orderController = require('../controllers/orderController.js');
const { protect } = require('../middleware/authMiddleware');
const routes = express.Router();

routes.post('/', protect, orderController.placeOrder);
routes.get('/all', orderController.getAllOrders);
routes.get('/:id', orderController.getOrder);
routes.get('/my-order', orderController.getMyOrders);
routes.patch('/:id/status', orderController.updateStatus);
routes.post('/generate-hash', orderController.generateHash);

module.exports = routes;

