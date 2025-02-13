const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const adminMiddleware = require("../middleware/adminMiddleware");

// Public Routes (No authentication needed)
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Admin-Only Route: View All Users
router.get("/view_users", adminMiddleware, userController.getUser);

// Protected Routes for User Management (Requires Authentication)
router.put("/update_users/:id", adminMiddleware, userController.updateUser);
router.delete("/delete_users/:id", adminMiddleware, userController.deleteUser);

module.exports = router;
