const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




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


module.exports = {registerUser, loginUser, logoutUser};