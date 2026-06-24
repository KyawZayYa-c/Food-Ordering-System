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
        console.log('get order : ', order)
        Msg(res, 'Order details fetched', order);
    } catch (error) {
        next(error);
    }
};

const getMyOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getOrderByUserId(req.user.id);
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

const updatePaymentStatus = async (req, res, next) => {
    try {
        const { payment_status, payment_id } = req.body;
        
        if (!payment_id) {
            return res.status(400).json({
                success: false,
                message: 'Payment ID is required'
            });
        }
        
        const updatedOrder = await orderService.updatePaymentStatus(
            req.params.id, 
            payment_status, 
            payment_id
        );
        Msg(res, 'Payment status updated', updatedOrder);
    } catch (error) {
        console.log('updatePaymentStatus error ', error);
        next(error);
    }
};

// backend/controllers/orderController.js
const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // ✅ အော်ဒါကို ရှာပါ
        const order = await orderService.getOrderById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        
        // ✅ Payment Paid ဖြစ်နေရင် မဖျက်ရအောင်
        if (order.payment_status === 'Paid') {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete order with paid payment'
            });
        }
        
        await orderService.deleteOrder(id);
        Msg(res, 'Order deleted successfully', null);
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
    updatePaymentStatus,
    deleteOrder
};