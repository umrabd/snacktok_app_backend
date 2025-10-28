const foodPartnerModel = require('../models/foodpartner.model');
const jwt = require('jsonwebtoken');

async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token
    // || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Please Login first' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if (!foodPartner) {
            return  res.status(401).json({ message: 'Please Login first' });
        }
        req.foodPartner = foodPartner;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authFoodPartnerMiddleware;

