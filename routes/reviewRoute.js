
const express = require('express')

const router = express.Router();

const reviewController = require('../controllers/reviewController')


router.get('/view_review',reviewController.getReview)
router.post('/create_review',reviewController.createReview)

router.put('/update_review',reviewController.updateReview)
router.delete('delete_review',reviewController.deleteReview)

module.exports = router;