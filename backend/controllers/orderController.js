const orderService = require('../services/orderService');
const { Msg } = require('../utils/util');

const placeOrder = async (req, res, next) => {
    try {
        const order = await orderService.createOrder(req.body);
        Msg(res, 'Order placed successfully', order, 201);
    } catch (error) {
        next(error); // Error Global Error Handler 
    }
};

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrders();
        Msg(res, 'Orders fetched successfully', orders);
    } catch (error) {
        next(error);
    }
};

const getOrder = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        Msg(res, 'Order details fetched', order);
    } catch (error) {
        next(error);
    }
};

const getMyOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getOrdersByUserId(req.user.id);
        Msg(res, 'Your orders fetched', orders);
    } catch (error) {
        next(error);
    }
};

const updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const updatedOrder = await orderService.updateOrderStatus(req.params.id, status);
        Msg(res, 'Order status updated', updatedOrder);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    placeOrder,
    getAllOrders,
    getOrder,
    getMyOrders,
    updateStatus
};