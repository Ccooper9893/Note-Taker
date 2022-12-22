// Importing required modules
const express = require('express'); // Web application framework
const path = require('path'); // Provides utilities for working with file and directory paths
const fs = require('fs'); // Enables interacting with the file system

// Creating server
const app = express();
const PORT = process.env.PORT || 3000;

// Custom middleware
const logger = (req, res, next) => {console.log(`${req.method} request at ${req.path}`); next()};

// Mounting middleware
app.use(logger); // Console logs requests and paths
app.use(express.json()); //Parses incoming JSON (Converts JSON in text format to Javascript object that can be used in JS)
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with urlencoded payloads

// Bind and listen the connections on the specified host and port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));