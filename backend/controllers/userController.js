const userService = require('../services/userService');
const generateToken = require('../utils/jwtToken');
const { Msg } = require('../utils/util');

const register = async (req, res, next) => {
    try {
        const user = await userService.registerUser(req.body);
        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });

        Msg(res, 'User registered successfully', { 
            userId: user._id, 
            role: user.role 
        }, 201);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'This email is already registered. Please use a different email or login.'
            });
        }
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });

        Msg(res, 'Login successful', {
            userId: user._id,
            role: user.role
        });
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0), 
    });
    Msg(res, 'Logged out successfully');
};

const getProfile = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.user.id);
        Msg(res, 'User Profile fetched', user);
    } catch (error) {
        next(error);
    }
}
const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        Msg(res, 'All customers fetched successfully', users);
    } catch (error) {
        next(error);
    }
};

const getUserDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserWithOrders(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        Msg(res, 'User details fetched successfully', user);
    } catch (error) {
        next(error);
    }
};


const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (id === req.user.id) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete your own account'
            });
        }
        
        const user = await userService.deleteUser(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        Msg(res, 'User deleted successfully', null);
    } catch (error) {
        next(error);
    }
};

const getUserStats = async (req, res, next) => {
    try {
        const stats = await userService.getUserStats();
        Msg(res, 'User stats fetched successfully', stats);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register, 
    login,
    logout,
    getProfile,
    getAllUsers,
    getUserDetails,
    deleteUser,
    getUserStats,
};