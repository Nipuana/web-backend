const Review = require("../model/ReviewModel");
const Product = require("../model/ProductModel");

// Get all reviews
async function getReviews(req, res) {
    try {
        const reviews = await Review.findAll({
            include: [{ model: Product, attributes: ["id", "productName"] }], // Include product details
        });
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Failed to load reviews" });
    }
}

// Get a single review by ID
async function getReviewById(req, res) {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id, {
            include: [{ model: Product, attributes: ["id", "productName"] }],
        });

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        console.error("Error fetching review:", error);
        res.status(500).json({ error: "Failed to load review" });
    }
}

// Create a new review
async function createReview(req, res) {
    try {
        const { Rating, Comment, productId } = req.body;

        if (!productId) {
            return res.status(400).json({ error: "Product ID is required" });
        }

        const newReview = await Review.create({ Rating, Comment, productId });

        res.status(201).json({ message: "Review created successfully", newReview });
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: "Failed to create review" });
    }
}

// Update a review
async function updateReview(req, res) {
    try {
        const { id } = req.params;
        const { Rating, Comment, productId } = req.body;
        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        await review.update({ Rating, Comment, productId });
        res.status(200).json({ message: "Review updated successfully", review });
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ error: "Failed to update review" });
    }
}

// Delete a review
async function deleteReview(req, res) {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        await review.destroy();
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: "Failed to delete review" });
    }
}

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
};
