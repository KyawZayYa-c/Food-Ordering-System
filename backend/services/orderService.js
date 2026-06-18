const Order = require('../model/Order');

const createOrder = async (orderData)=>{
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    if (!savedOrder) throw new Error("Order creation is failed...");
    return savedOrder;
}

const getAllOrders = async () => {
    const orders = await Order.find().populate('customer', 'name email phone');
    return orders;
}

const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate('customer, name email phone');
    return orders;
}

const getOrderByUserId = async (userId) => {
    const orders = await Order.find({ customer: userId }).sort({ createdAt: -1 });
    return orders;
};

const updateOrderStatus = async (orderId, status) => {
    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    );
    if (!updateOrder) throw new Error("Failed to update status, order not found!");
    return updatedOrder;
};

module.exports = {
    createOrder, 
    getAllOrders,
    getOrderById,
    getOrderByUserId,
    updateOrderStatus,
}