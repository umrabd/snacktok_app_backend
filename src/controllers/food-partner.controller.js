const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/foodItem.model');

async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;
    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await foodModel.find({foodPartner: foodPartnerId});
    if(!foodPartner){
        res.status(404).json({message: 'Food Partner not found'});
        return;

    }
    res.status(200).json({
        message: 'Food Partner fetched successfully',
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner,
        }
    });
}

module.exports = {
    getFoodPartnerById,
};

