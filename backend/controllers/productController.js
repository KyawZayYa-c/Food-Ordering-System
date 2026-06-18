const productService = require('../services/productService');
const { Msg } = require('../utils/util');

const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        Msg(res, 'Product fetched', products)
    } catch (error) {
        next(error);
    }
}

const getProduct = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        Msg(res, 'Product details fetched', product);
    } catch (error) {
        next(error);
    }
}

const addProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.body);
        Msg(res, "Product add successfully", 201)
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await        productService
            .updateProduct(req.params.id, req.body);
        Msg(res, "Product updated", updatedProduct);
    } catch (error) {
        next(error);
    }
}

const deletePrduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(req.params.id);
        Msg(res, 'Prdouct deleted');
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    updateProduct, 
    deletePrduct,
    addProduct
}
