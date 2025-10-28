const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');
const authFoodPartnerMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');


const uploads = multer({
    storage: multer.memoryStorage(),
})

// Food Item Routes
router.post('/',
     authFoodPartnerMiddleware,
     uploads.single("video"),
     foodController.createFoodItem);


module.exports = router;
