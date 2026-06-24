const User = require('../model/User');
const bcrypt = require('bcrypt');

const registerUser = async (userData) => {
    const { password, email, phone } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    return await user.save();
}

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return user;
};

const getUserById = async (id) => {
    return await User.findById(id).select('-password'); 
};

const getAllUsers = async () => {
    return await User.find({ role: 'customer' })
        .select('-password')
        .sort({ createdAt: -1 });
};

const getUserWithOrders = async (id) => {
    return await User.findById(id)
        .select('-password')
        .populate({
            path: 'orders',
            populate: {
                path: 'items.product',
                select: 'name price image_url'
            }
        });
};

const updateUserStatus = async (id, status) => {
    return await User.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    ).select('-password');
};


const deleteUser = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    await user.deleteOne();
    return user;
};


const getUserByEmail = async (email) => {
    return await User.findOne({ email }).select('-password');
};

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getAllUsers,
    getUserWithOrders,
    updateUserStatus,
    deleteUser,
    getUserByEmail,
};