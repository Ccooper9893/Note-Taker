// Importing required modules
const express = require('express'); // Web application framework
const path = require('path'); // Provides utilities for working with directory paths
const api = require('./routers/index'); // Important api routers

// Creating server
const app = express();
const PORT = process.env.PORT || 3001;

// Custom middleware that executes with every HTML request method
const logger = (req, res, next) => {console.log(`${req.method} request called`); next()};

// Mounting middleware
app.use(logger); // Console logs client requests
app.use(express.json()); //Parses incoming JSON (Converts JSON that is in text format to a object that can be used in JS)
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with urlencoded payloads
app.use(express.static('public'));// // Allows HTTP to access files from public folder
app.use('/api', api); // Tells express to use these for /api routes

// Get route for main notes page
app.get('/notes', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Get route for homepage (Wildcard route)
app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Bind and listen the connections on the specified host and port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));