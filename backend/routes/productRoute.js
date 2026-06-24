const express = require('express') ;
const productController = require('../controllers/productController.js');

const { validate } = require('../utils/middleware/validator.js'); 
const { productSchema } = require('../utils/schemas/productSchema.js');
const { admin, protect } = require('../utils/middleware/authMiddleware.js');
const upload = require('../utils/middleware/uploadMiddleware.js');

const routers = express.Router();

routers.get('/', productController.getAllProducts);
routers.get('/:id', productController.getProduct);
routers.patch('/:id',
    protect,
    admin,
    upload.single('image'),
    productController.updateProduct);
    
routers.delete('/:id',protect, admin, productController.deletePrduct);

routers.post('/',
    protect,
    admin,
    upload.single('image'),
    validate(productSchema),
    productController.addProduct);

module.exports = routers;