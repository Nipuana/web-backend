
const express = require('express')

const router = express.Router();

const productController = require('../controllers/productController')


router.get('/view_products',productController.getProduct)
router.post('/create_products',productController.createProduct)

router.put('/update_products',productController.updateProduct)
router.delete('delete_products',productController.deleteProduct)

module.exports = router;