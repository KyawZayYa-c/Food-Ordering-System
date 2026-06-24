const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    status: { 
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active'  
    }
}, { timestamps: true });

userSchema.pre('deleteOne', { document: true, query: false }, async function() {
    const userId = this._id;
    await mongoose.model('Order').deleteMany({ customer: userId });
});

module.exports = mongoose.model('User', userSchema);