const express = require('express');
const orderController = require('../controllers/orderController.js');
const { protect } = require('../utils/middleware/authMiddleware.js');
const { validate } = require('../utils/middleware/validator.js'); 
const { orderSchema } = require('../utils/schemas/orderSchema.js');
const routes = express.Router();

routes.post('/', protect, validate(orderSchema), orderController.getAllOrders);
routes.get('/:id', orderController.getOrder);
routes.get('/my-order', orderController.getMyOrders);
routes.patch('/:id/status', orderController.updateStatus);
routes.post('/generate-hash', orderController.generateHash);

module.exports = routes;

