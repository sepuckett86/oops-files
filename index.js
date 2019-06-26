const fs = require('fs');
const { 
  getFileContent, 
  makeFiles,
  getDateModified,
  readDirectory,
  renameFile
} = require('./file-methods');

function renameAllFiles(directory, callback) {
  // get array of files in directory
  // loop through array for each file
    // get content
    // get date modified
    // make new file with same content and new file name
    // delete old file
    // when the last file is done, invoke callback
  callback();
}

module.exports = {
  renameAllFiles
}