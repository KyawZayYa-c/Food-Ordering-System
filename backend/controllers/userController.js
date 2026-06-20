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

module.exports = {
    register, 
    login,
    logout,
    getProfile,
}