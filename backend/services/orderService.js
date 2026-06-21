const Order = require('../model/Order');
const crypto = require('crypto');

const createOrder = async (orderData)=>{
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    if (!savedOrder) throw new Error("Order creation is failed...");
    return savedOrder;
}

const getAllOrders = async () => {
    const orders = await Order.find().populate('customer', 'name email phone').populate('items.product', 'name price')
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
    const merchant_id = process.env.PAYHERE_MERCHANT_ID;
    const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;
    console.log('merchant secret ', merchant_secret)
    const currency = 'LKR';
    
    // Hash calculate
    let hashedSecret = crypto.createHash('md5').update(merchant_secret).digest('hex').toUpperCase();

    const stringToHash = merchant_id + order_id.toString() + parseFloat(amount).toFixed(2) + currency + hashedSecret;

    let hash = crypto.createHash('md5')
    .update(stringToHash)
    .digest('hex')
        .toUpperCase();
    
    console.log('hash : ', hash);
    
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