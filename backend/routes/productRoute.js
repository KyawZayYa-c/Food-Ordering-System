const express = require('express') ;
const productController = require('../controllers/productController.js') ;
const routers = express.Router();

routers.get('/', productController.getAllProducts);
routers.get('/:id', productController.getProduct);
routers.patch('/:id', productController.updateProduct);
routers.delete('/:id', productController.deletePrduct);
routers.post('/', productController.addProduct);

module.exports = routers;