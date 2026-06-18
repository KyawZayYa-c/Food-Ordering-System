const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true }
    }],
    total_amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    payment_status: { type: String, default: 'Pending' },
    payment_id: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);