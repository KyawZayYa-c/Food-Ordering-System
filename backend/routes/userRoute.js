const express = require('express');
const userController = require('../controllers/userController.js');
const { protect, admin } = require('../utils/middleware/authMiddleware.js');
const routes = express.Router();

// Public Routes
routes.post('/register', userController.register);
routes.post('/login', userController.login);
routes.post('/logout', userController.logout);

// User Routes (Protected)
routes.get('/profile', protect, userController.getProfile);

// Admin Routes (Customer Management)
routes.get('/', protect, admin, userController.getAllUsers);
routes.get('/stats', protect, admin, userController.getUserStats);
routes.get('/:id', protect, admin, userController.getUserDetails);
routes.delete('/:id', protect, admin, userController.deleteUser);

module.exports = routes;