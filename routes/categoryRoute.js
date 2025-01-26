
const express = require('express')

const router = express.Router();

const categoryController = require('../controllers/categoryController')


router.get('/view_orders',categoryController.getCategory)
router.post('/create_orders',categoryController.createCategory)

router.put('/update_orders',categoryController.updateCategory)
router.delete('delete_orders',categoryController.deleteCategory)

module.exports = router;