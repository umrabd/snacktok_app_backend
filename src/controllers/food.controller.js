const foodItemModel = require("../models/foodItem.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");
const likeModel = require("../models/like.model");

// Add Food Item

async function createFoodItem(req, res) {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );

  const foodItem = await foodItemModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });
  res.status(201).json({
    message: "Food item created successfully",
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
      message: "Error fetching food items",
    });
  }
}


async function likeFood(req, res) {
    const {foodId} = req.body;
    const userId = req.user;

    const isAlreadyLiked = await likeModel.findOne({food: foodId, user: userId._id});
    if(isAlreadyLiked) {
        await likeModel.deleteOne({food: foodId, user: userId._id});
        await foodItemModel.findByIdAndUpdate(foodId, {$inc: {likesCount: -1}});
        return res.status(200).json({message: "Food item unliked successfully"});
    }

    const like = await likeModel.create({food: foodId, user: userId._id});
    await foodItemModel.findByIdAndUpdate(foodId, {$inc: {likesCount: 1}});
    res.status(201).json({message: "Food item liked successfully", like});
}

module.exports = {
  createFoodItem,
  getFoodItems,
    likeFood,
};
