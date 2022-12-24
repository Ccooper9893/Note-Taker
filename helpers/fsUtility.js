const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFile = util.promisify(fs.readFile);

/** Function for writing new file
 * 
 * @param {string} destination // File you want to write to
 * @param {object} content // Data you want the file to have
 * 
 */

// Creates new file
const writeFile = (destination, content) => {
    fs.writeFile(file, JSON.stringify(content, null, 4), err => {
        err ? console.log(err) : console.log(`File has been created at ${destination}`);
    });
};

/** Function for reading and overwriting file
 * 
 * @param {string} file // File you want to overwrite
 * @param {object} content // Content you want to update
 * 
 */

const addNewNote = (file, content) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeFile(file, parsedData);
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
            console.log(err);
        } else {
            const parsedData = JSON.parse(data);
            const targetId = parsedData.findIndex(id);
            parsedData.splice(targetId, 1);
        };
    writeNewFile(file, content)
    });
};

module.exports = { readFile, writeFile, addNewNote, deleteNote };