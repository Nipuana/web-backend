
const express = require('express')

const router = express.Router();

const categoryController = require('../controllers/categoryController')


router.get('/view_category',categoryController.getCategory)
router.post('/create_category',categoryController.createCategory)

router.put('/update_category',categoryController.updateCategory)
router.delete('delete_category',categoryController.deleteCategory)

module.exports = router;