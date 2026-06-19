const joi = require('joi');

const userSchema = {
    register: joi.object({
        name: joi.string()
                 .min(3)
                 .max(50)
                 .required(),
        email: joi.string()
                  .email() 
                  .required(),
        password: joi.string()
                     .min(8)
                     .max(20)
                     .required(),
        phone: joi.string()
                  .min(7)
                  .max(15)
                  .required(),
        role: joi.string()
                 .valid('customer', 'admin') 
    }),

    login: joi.object({
        email: joi.string()
                  .email()
                  .required(),
        password: joi.string()
                     .required()
    })
};

module.exports = userSchema;