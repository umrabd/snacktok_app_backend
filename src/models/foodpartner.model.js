const mongoose = require('mongoose');
const foodPartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },  
    contactName: {
            type: String,
            required: true,
    },

    phoneNumber:{
type: String,
required: true,
    },
    location: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },

}, { timestamps: true });
const foodPartnerModel = mongoose.model('foodpartner', foodPartnerSchema);
module.exports = foodPartnerModel;