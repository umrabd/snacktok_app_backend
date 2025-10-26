const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser); 
router.get('/user/logout', authController.logoutUser);

module.exports = router;