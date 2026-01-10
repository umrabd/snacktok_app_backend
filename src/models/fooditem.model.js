const mongoose = require ('mongoose');

const foodScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    video: {
        type: String,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodpartner',
        required: true,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    

}, {timestamps: true});

const foodItemModel = mongoose.model('fooditem', foodScheme);

module.exports = foodItemModel;