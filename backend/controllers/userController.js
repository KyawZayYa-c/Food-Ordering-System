const userService = require('../services/userService');
const generateToken = require('../utils/jwtToken');
const { Msg } = require('../utils/util');

const register = async (req, res, next) => {
    try {
        const user = await userService.registerUser(req.body);
        const token = generateToken(user);
        Msg(res, 'User registerd successfuly', { user, token }, 201)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next)=>{
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        const token = generateToken(user);
        Msg(res, 'Login successful', {
            userId: user._id,
            role: user.role,
            token
        })
    } catch (error) {
        next(error);
    }
}

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
    getProfile,
}