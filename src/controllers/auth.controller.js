const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// User Registration

async function registerUser(req, res) {
    const { fullname, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullname,
        email,
        password: hashedPassword,

    });

    const token = jwt.sign({
        id: user._id,

    }, process.env.JWT_SECRET, { expiresIn: '1h' } );

    res.cookie('token', token);
    res.status(201).json({ message: 'User registered successfully', user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        token
    } });
    

}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({
        id: user._id,

    }, process.env.JWT_SECRET, { expiresIn: '1h' } );
    res.cookie('token', token);
    
    res.status(200).json({ message: 'Login successful', user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        token
    } });
}   
async function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}

//Food Partner Registration

async function registerFoodPartner(req, res) {
    // Implementation for food partner registration
    const { name, email, password } = req.body;
    const existingPartner = await foodPartnerModel.findOne({ email });
    if (existingPartner) {
        return res.status(400).json({ message: 'Food Partner already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,

    });

    const token = jwt.sign({
        id: foodPartner._id,

    }, process.env.JWT_SECRET, { expiresIn: '1h' } );

    res.cookie('token', token);
    res.status(201).json({ message: 'Food Partner registered successfully', foodPartner: {
        id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email,
        token
    } });


}

async function loginFoodPartner(req, res) {
    // Implementation for food partner login
    const { email, password } = req.body;
    const foodPartner = await foodPartnerModel.findOne({ email})
    if (!foodPartner) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({
        id: foodPartner._id,

    }, process.env.JWT_SECRET, { expiresIn: '1h' } );
    res.cookie('token', token);
    res.status(200).json({ message: 'Login successful', foodPartner: {
        id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email,
        token
    } });
}

async function logoutFoodPartner(req, res) {
    // Implementation for food partner logout
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}


module.exports = {registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner};