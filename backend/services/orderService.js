const Order = require('../model/Order');
const crypto = require('crypto');

const createOrder = async (orderData)=>{
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    if (!savedOrder) throw new Error("Order creation is failed...");
    return savedOrder;
}

const getAllOrders = async () => {
    const orders = await Order.find().populate('customer', 'name email phone').populate('items.product', 'name price image_url')
        .sort({ createdAt: -1 });;
    return orders;
}

const getOrderById = async (orderId) => {
   const order = await Order.findById(orderId).populate('customer', 'name email phone');
    return order;
}

const getOrderByUserId = async (userId) => {
    const orders = await Order.find({ customer: userId })
         .populate('customer', 'name email phone')
        .populate('items.product', 'name price image_url')
        .sort({ createdAt: -1 });
    return orders;
};

const updateOrderStatus = async (orderId, status) => {
    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    );
    if (!updatedOrder) throw new Error("Failed to update status, order not found!");
    return updatedOrder;
};


const updatePaymentStatus = async (orderId, status, paymentId) => {
    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { 
            payment_status: status, 
            payment_id: paymentId 
        },
        // { new: true }
        { returnDocument: 'after' }
    );
    if (!updatedOrder) throw new Error("Order not found!");
    return updatedOrder;
};

module.exports = {
    createOrder, 
    getAllOrders,
    getOrderById,
    getOrderByUserId,
    updateOrderStatus,
    updatePaymentStatus,
    
}