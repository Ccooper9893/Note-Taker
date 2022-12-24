// Importing required modules
const express = require('express'); // Web application framework
const path = require('path'); // Provides utilities for working with directory paths
const fs = require('fs'); // Enables interacting with the file system
const { v4: uuidv4 } = require('uuid'); // Provides unique ids
const readFile = require('./helpers/fsUtility.js');

// Creating server
const app = express();
const PORT = process.env.PORT || 3001;

// Custom middleware
const logger = (req, res, next) => {console.log(`${req.method} request at ${req.path}`); next()};

// Mounting middleware
app.use(logger); // Console logs client requests
app.use(express.json()); //Parses incoming JSON (Converts JSON in text format to Javascript object that can be used in JS)
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with urlencoded payloads
app.use(express.static('public'));// // Allows HTTP to access files from public folder

// Get route for notes page
app.get('/notes', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Get route for saved notes
app.get('/api/notes', (req, res, next) => {
    // res.sendFile(path.join(__dirname, '/db/db.json')) // Sends JSON data requested by index.html fetch request line 29
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Post route for updating saved notes
app.post('/api/notes', (req, res, next) => { 
    // Reads the db.json file that contains notes
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        let notesArray = JSON.parse(data); // Converts string into object

        // Ensures the req is valid before updating note data
        if (req.body) {
        // Creates new note from client information
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4() //Calls for unique id
        };

        notesArray.push(newNote); // Updated notes array with new note
    
    // Creates new db.json file with clients note added
    fs.writeFile('./db/db.json', JSON.stringify(notesArray, null, 4), (err) => {
        if (err) {
            console.log(err)
        }
    })};    
    });

    //Returns the newly updated db.json file containing notes
    res.json(console.log('Notes updated!'));
});

app.delete('/api/notes/:id', (req, res, next) => {
    if (req.params.id) {
        const noteId = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('There has been an ERROR!', err);
        } else {
            let notesArray = JSON.parse(data) // Converts string to array of objects
            for (let i=0; i<notesArray.length; i++) {
                if (notesArray[i].id == req.params.id) {
                    notesArray.splice(i, 1);
                }
            }
            // Creates new db.json file with clients note deleted
            fs.writeFile('./db/db.json', JSON.stringify(notesArray, null, 4), (err) => {
                if (err) {
                    console.log(err)
                }
            })
            // res.sendFile(path.join(__dirname, '/db/db.json'));
            res.json(console.log('Notes updated!'));
        }
    })
}})

// Get route for homepage (Wildcard)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Bind and listen the connections on the specified host and port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));