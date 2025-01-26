
const express = require('express')

const router = express.Router();

const orderController = require('../controllers/orderController')


router.get('/view_orders',orderController.getOrder)
router.post('/create_orders',orderController.createOrder)

router.put('/update_orders',orderController.updateOrder)
router.delete('delete_orders',orderController.deleteOrder)

module.exports = router;