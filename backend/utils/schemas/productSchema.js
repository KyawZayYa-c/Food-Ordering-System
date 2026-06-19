const joi = require('joi');

const productSchema = joi.object({
    name: joi.string().min(3).max(100).required(),
    description: joi.string().max(500).allow(''),
    price: joi.number().positive().required(),
    image_url: joi.string().uri().allow(''),
    category: joi.string().required()
});

module.exports = { productSchema };