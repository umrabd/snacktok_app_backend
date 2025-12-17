const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route');
const foodRoutes = require('./routes/food.route');
const foodPartnerRoutes = require('./routes/food-partner.route');
const cors = require('cors');


const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Adjust according to your frontend's address
    credentials: true,
}));
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Worlddddd!');
});

// Use authentication routes
app.use('/api/auth', authRoutes);

// Use food routes
app.use('/api/food', foodRoutes);

// Use food partner routes
app.use('/api/food-partner', foodPartnerRoutes);


module.exports = app;


