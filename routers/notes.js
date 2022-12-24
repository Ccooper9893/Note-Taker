notes = require('express').Router(); // Creates a router
const { readFile, addNewNote, deleteNote } = require('../helpers/fsUtility');
const { v4: uuidv4 } = require('uuid'); // Creates unique ids

// Retrieves notes from notes data file
notes.get('/', (req, res, next) => {
    readFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)))
        .catch((err) => console.log(`There has been an error in ${req.method} request!`));
});

// Adds a new note to notes data file
notes.post('/', (req, res, next) => {
    
    // Grabs request note data from user
    const { title, text} = req.body; // Destructs required keys/values from request body
    const newNote = { // Creates new note from user input
        title: title,
        text: text,
        id: uuidv4()
        };

        addNewNote('./db/db.json', newNote);
        res.json(console.log('Note added!'));  
});

// Deletes note from notes data file using parameter of id
notes.delete('/:id', (req, res, next) => {
    deleteNote('./db/db.json', req.params.id);
    res.json(console.log('Note deleted!'))
}); // If parameter does not match an existing note ID

module.exports = notes;