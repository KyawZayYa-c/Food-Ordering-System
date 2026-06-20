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
        const productData = req.body;
        if (req.file) {
            productData.image_url = `/uploads/${req.file.filename}`;
        }
        const product = await productService.createProduct(productData);
        Msg(res, "Product add successfully", 201)
    } catch (error) {
        next(error);
    }
}
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); 
const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateData = { ...req.body };
        const newImagePath = req.file ? `/uploads/${req.file.filename}` : null;
         //await delay(3000);
        const updatedProduct = await productService.updateProduct(id, updateData, newImagePath);
        Msg(res, 'Product updated', updatedProduct);
    } catch (error) {
        next(error);
    }
};

const deletePrduct = async (req, res, next) => {
    try {
       //await delay(3000);
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
