const express = require('express');
const crypto = require("crypto");
const orderController = require('../controllers/orderController.js');
const { protect, admin } = require('../utils/middleware/authMiddleware.js');
const { validate } = require('../utils/middleware/validator.js'); 
const { orderSchema } = require('../utils/schemas/orderSchema.js');
const routes = express.Router();

routes.post('/', protect, validate(orderSchema), orderController.placeOrder);
routes.get('/all', protect, admin, orderController.getAllOrders);
routes.get('/my-order', protect, orderController.getMyOrders);
routes.get('/:id',  orderController.getOrder);
routes.patch('/:id/status', protect, orderController.updateStatus);
routes.patch('/:id/payment-status', protect, orderController.updatePaymentStatus);


module.exports = routes;
