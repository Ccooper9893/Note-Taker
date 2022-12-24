notes = require('express').Router();
const { readFile, writeFile, addNewNote, deleteNote } = require('../helpers/fsUtility');
const { v4: uuidv4 } = require('uuid');

notes.get('/api/notes', (req, res, next) => {
    
})