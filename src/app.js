const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route');


app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Worlddddd!');
});

// Use authentication routes
app.use('/api/auth', authRoutes);


module.exports = app;


