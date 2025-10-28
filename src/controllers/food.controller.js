const foodItemModel = require('../models/foodItem.model');
const storageService = require('../services/storage.service');
const {v4: uuid} = require("uuid")


// Add Food Item

async function createFoodItem(req, res) {
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
    console.log(fileUploadResult);
    res.send("uploaded...")

}
module.exports = {
    createFoodItem,
};
