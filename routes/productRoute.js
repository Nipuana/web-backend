
const express = require('express')
const upload= require('../middleware/imageUpload')

const router = express.Router();

const productController = require('../controllers/productController')

router.post('/create_products',upload.single('productImage'),productController.createProduct);

router.get('/view_products',productController.getAllProducts);

router.get('/id_view_products',productController.getProductById);

router.put('/update_products',upload.single('productImage'),productController.updateProduct);

router.delete('delete_products',productController.deleteProduct);

module.exports = router;