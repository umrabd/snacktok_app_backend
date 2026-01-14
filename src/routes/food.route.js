const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const multer = require('multer');


const uploads = multer({
    storage: multer.memoryStorage(),
})

// Food Item Routes
router.post('/',
     authMiddleware.authFoodPartnerMiddleware,
     uploads.single("video"),
     foodController.createFoodItem);


// Get Food Items
router.get('/', authMiddleware.authUserMiddleware , foodController.getFoodItems);

// Like Food Item
router.post('/like', authMiddleware.authUserMiddleware , foodController.likeFood);

// Save Food Item
router.post('/save', authMiddleware.authUserMiddleware , foodController.saveFood);



module.exports = router;
