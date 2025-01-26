
const express = require('express')

const router = express.Router();

const orderController = require('../controllers/orderController')


router.get('/view_orders',productController.getOrder)
router.post('/create_orders',productController.createOrder)

router.put('/update_orders',productController.updateOrder)
router.delete('delete_orders',productController.deleteOrder)

module.exports = router;