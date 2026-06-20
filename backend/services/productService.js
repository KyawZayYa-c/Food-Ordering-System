const Product = require('../model/Product');
const { deleteFile } = require('../utils/fileHelper');

const getAllProducts = async () => {
    return await Product.find();
}

const getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
}

const createProduct = async (productData) => {
    const newProduct = new Product(productData);
    return await newProduct.save();
}

const updateProduct = async (id, updateData, newImagePath) => {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");
    if (newImagePath && product.image_url) {
        deleteFile(product.image_url);
        updateData.image_url = newImagePath; 
    }
    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) throw new Error("Product not found to update");
    return updated;
};

const deleteProduct = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");
    if (product.image_url) {
        deleteFile(product.image_url);
    }
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) throw new Error("Product not found to delete");
    return deleted;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
