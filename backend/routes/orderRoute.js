const express = require('express');
const orderController = require('../controllers/orderController.js');
const { protect, admin } = require('../utils/middleware/authMiddleware.js');
const { validate } = require('../utils/middleware/validator.js'); 
const { orderSchema } = require('../utils/schemas/orderSchema.js');
const routes = express.Router();

routes.post('/', protect, validate(orderSchema), orderController.placeOrder);
routes.get('/all', protect, admin, orderController.getAllOrders);
routes.get('/:id', protect, orderController.getOrder);
routes.get('/my-order', protect, orderController.getMyOrders);
routes.patch('/:id/status', protect, orderController.updateStatus);
routes.post('/generate-hash', protect, orderController.generateHash);
routes.post('/notify', orderController.handlePayHereNotify);

module.exports = routes;

