const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image_url: { type: String },
    category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);


productSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    const productId = this._id;
    await mongoose.model('Order').updateMany(
        { "items.product": productId },
        { $pull: { items: { product: productId } } }
    );
    next();
});