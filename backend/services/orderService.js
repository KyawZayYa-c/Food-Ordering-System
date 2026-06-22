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
/**
// orderService.js 
const getAllOrders = async () => {
    return await Order.find()
        .populate('customer', 'name email phone') // User  Name, Email, Phone 
        .populate('items.product', 'name price');  // Product Name  Price
}

const getOrderById = async (orderId) => {
    return await Order.findById(orderId)
        .populate('customer', 'name email phone')
        .populate('items.product', 'name price');
}
 */


const getOrderByUserId = async (userId) => {
    const orders = await Order.find({ customer: userId })
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


const getPaymentHash = (order_id, amount) => {
    const merchant_id = "1236454";
    const merchant_secret = "OTcxMTY5MzQ2MzY0NjM4NjM4MDM3OTIxNzM0MjcyNDMyODExMDE0";
    console.log('merchant secret ', merchant_secret)
    const currency = 'LKR';
    const safeOrderId = order_id ? order_id.toString() : "";
    // Hash calculate
    let hashedSecret = crypto.createHash('md5').update(merchant_secret).digest('hex').toUpperCase();

    const stringToHash = merchant_id + safeOrderId + parseFloat(amount).toFixed(2) + currency + hashedSecret;

    let hash = crypto.createHash('md5')
    .update(stringToHash)
    .digest('hex')
        .toUpperCase();
    
    console.log('hash BACKEND services : ', hash);
    
    return hash;
};

const updatePaymentStatus = async (orderId, status, paymentId) => {
    return await Order.findByIdAndUpdate(
        orderId,
        { payment_status: status, payment_id: paymentId },
        { new: true }
    );
};
module.exports = {
    createOrder, 
    getAllOrders,
    getOrderById,
    getOrderByUserId,
    updateOrderStatus,
    getPaymentHash,
    updatePaymentStatus,
}