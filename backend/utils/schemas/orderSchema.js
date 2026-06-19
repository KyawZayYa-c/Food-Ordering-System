const joi = require('joi');

const orderSchema = joi.object({
    items: joi.array().items(
        joi.object({
            product: joi.string().required(), 
            quantity: joi.number().min(1).required()
        })
    ).required(),
    total_amount: joi.number().required()
});

module.exports = { orderSchema };