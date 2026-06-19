const express = require('express');
const userController = require('../controllers/userController.js');
const { protect } = require('../utils/middleware/authMiddleware.js');
const routes = express.Router();

routes.post('/register', userController.register);
routes.post('/login', userController.login);
routes.get('/profile', protect, userController.getProfile);

module.exports = routes;
