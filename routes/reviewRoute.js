const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get("/view_reviews", reviewController.getReviews);
router.get("/view_reviews/:id", reviewController.getReviewById);
router.post("/create_review", reviewController.createReview);
router.put("/update_review/:id", reviewController.updateReview);
router.delete("/delete_review/:id", reviewController.deleteReview);

module.exports = router;
