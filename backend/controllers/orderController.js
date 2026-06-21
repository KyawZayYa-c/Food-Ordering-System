const orderService = require('../services/orderService');
const { Msg } = require('../utils/util');

const placeOrder = async (req, res, next) => {
    try {
        const { items, total_amount, shippingAddress } = req.body;
        const customerId = req.user.id;

        const orderData = { 
            customer: customerId,
            items,
            total_amount,
            shippingAddress 
        };

        const order = await orderService.createOrder(orderData);
        
        Msg(res, 'Order placed successfully', order, 201);
    } catch (error) {
        next(error); 
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

const generateHash = async (req, res, next) => {
    try {
        const { order_id, amount } = req.body;
        const hash = orderService.getPaymentHash(order_id, amount);
        Msg(res, 'Hash generated', { hash });
    } catch (error) {
        next(error);
    }
};

const handlePayHereNotify = async (req, res, next) => {
    try {
        const { order_id, status_code, payment_id } = req.body;
        
        // Status code 2 Payment Success 
        if (status_code === '2') {
            await orderService.updatePaymentStatus(order_id, 'Paid', payment_id);
            res.status(200).send('Notification received');
        } else {
            res.status(400).send('Payment failed or pending');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    placeOrder,
    getAllOrders,
    getOrder,
    getMyOrders,
    updateStatus,
    generateHash,
    handlePayHereNotify,
};