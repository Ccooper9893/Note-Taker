// Importing required modules
const express = require('express'); // Web application framework
const path = require('path'); // Provides utilities for working with file and directory paths
const fs = require('fs'); // Enables interacting with the file system
const uuid = require('./helpers/uuid.js');

// Creating server
const app = express();
const PORT = process.env.PORT || 3001;

// Custom middleware
const logger = (req, res, next) => {console.log(`${req.method} request at ${req.path}`); next()};

// Mounting middleware
app.use(logger); // Console logs requests and paths
app.use(express.json()); //Parses incoming JSON (Converts JSON in text format to Javascript object that can be used in JS)
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with urlencoded payloads
app.use(express.static('public'));// // Allows HTTP to access files from public folder




// Get route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Get route for db.json data
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json')) // Sends JSON data requested by index.html fetch request line 29
});

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        //req.body -> object
        //data -> string
        let parsedData = JSON.parse(data);
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuid()
        };

        parsedData.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) => {
        if (err) {
            console.log(err)
        }
    });    
    })
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

// Get route for homepage (Wildcard)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Bind and listen the connections on the specified host and port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));