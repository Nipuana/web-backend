const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure correct path
const authMiddleware = require('../middleware/authMiddleware'); // Ensure middleware exists
// console.log("User Controller:", userController);

// Public Routes (No authentication required)
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// // Protected Routes (Require authentication)
router.get('/view_users', authMiddleware, userController.getUser);
router.put('/update_users/:id', authMiddleware, userController.updateUser);
router.delete('/delete_users/:id', authMiddleware, userController.deleteUser);

module.exports = router;
