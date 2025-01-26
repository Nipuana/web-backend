
const express = require('express')

const router = express.Router();

const reviewController = require('../controllers/reviewController')


router.get('/view_products',reviewController.getReview)
router.post('/create_products',reviewController.createReview)

router.put('/update_products',reviewController.updateReview)
router.delete('delete_products',reviewController.deleteReview)

module.exports = router;