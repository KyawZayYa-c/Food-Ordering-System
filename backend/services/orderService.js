const Order = require('../model/Order');
const crypto = require('crypto');

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
/**
// orderService.js ထဲမှာ
const getAllOrders = async () => {
    return await Order.find()
        .populate('customer', 'name email phone') // User ရဲ့ Name, Email, Phone ကို ဆွဲထုတ်မယ်
        .populate('items.product', 'name price');  // Product ရဲ့ Name နဲ့ Price ကို ဆွဲထုတ်မယ်
}

const getOrderById = async (orderId) => {
    return await Order.findById(orderId)
        .populate('customer', 'name email phone')
        .populate('items.product', 'name price');
}
 */


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

const getPaymentHash = (order_id, amount) => {
    const merchant_id = process.env.PAYHERE_MERCHANT_ID;
    const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;
    const currency = 'LKR';
    
    // Hash တွက်ချက်ခြင်း
    let hashedSecret = crypto.createHash('md5').update(merchant_secret).digest('hex').toUpperCase();
    let hash = crypto.createHash('md5').update(merchant_id + order_id + parseFloat(amount).toFixed(2) + currency + hashedSecret).digest('hex').toUpperCase();
    
    return hash;
};

module.exports = {
    createOrder, 
    getAllOrders,
    getOrderById,
    getOrderByUserId,
    updateOrderStatus,
    getPaymentHash,
}