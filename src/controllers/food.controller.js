const foodItemModel = require('../models/foodItem.model');
const storageService = require('../services/storage.service');
const {v4: uuid} = require("uuid")


// Add Food Item

async function createFoodItem(req, res) {
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
   
    const foodItem = await foodItemModel.create({
name: req.body.name,
description: req.body.description,
video: fileUploadResult.url,
foodPartner: req.foodPartner._id,
    });
    res.status(201).json({
        message: 'Food item created successfully',
        foodItem, 
    });
}


// Get Food Items
async function getFoodItems(req, res) {
    try {
        const foodItems = await foodItemModel.find();
        res.status(200).json({
            foodItems,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching food items',
        });
    }
}

module.exports = {
    createFoodItem,
    getFoodItems,
};
