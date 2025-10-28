const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');
const authFoodPartnerMiddleware = require('../middlewares/auth.middleware');

// Food Item Routes
router.post('/', authFoodPartnerMiddleware,  foodController.addFoodItem);

module.exports = router;
