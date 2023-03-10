const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFile = util.promisify(fs.readFile);

/** Function for writing new file
 * 
 * @param {string} destination // File you want to write to
 * @param {object} content // Data you want the new file to have
 * 
 */

// Creates new file
const writeFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), err => {
        err ? console.log(err) : console.log(`File has been created at ${destination}`);
    });
};

/** Function for reading and overwriting file
 * 
 * @param {string} file // File you want to overwrite
 * @param {object} content // Content you want to add
 * 
 */

const addNewNote = (file, content) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content); // Pushes new note onto array of notes
            writeFile(file, parsedData); // Writes new file with updated json file
        };
    });
};

/**
 * 
 * @param {string} file // File you want to delete data from 
 * @param {string} id  // Specfic note id
 */

const deleteNote = (file, id) => {
    fs.readFile(file, 'utf-8', (err, data) => {

        if (err) {
            console.log(`There has been an error reading ${file}.`);

        } else {
            const parsedData = JSON.parse(data); // Parses data string into object

            for (i=0; i<parsedData.length; i++) { // Iterates through objects to check if note id exists
                if (parsedData[i].id == id) {
                    parsedData.splice(i, 1) // Removes note with matching id
                };
            };

            writeFile('./db/db.json', parsedData);
        };
    });
};

module.exports = { readFile, addNewNote, deleteNote };