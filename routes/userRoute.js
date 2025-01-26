
const express = require('express')

const router = express.Router();

const userController = require('../controllers/userController')

router.get('/view_users',userController.getUser)
router.post('/create_users',userController.createUser)

router.put('/update_users',userController.updateUser)
router.delete('delete_users',userController.deleteUser)

module.exports = router;