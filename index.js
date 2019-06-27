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
  readDirectory('fixtures', (err, files) => {
    if(err) return callback(err);
    // loop through array for each file
    let count = 0;
    files.forEach(file => {
      // get content
      getFileContent(`fixtures/${file}`, (err, data) => {
        if(err) return callback(err);
        const content = data;
        getDateModified(`fixtures/${file}`, (err, data) => {
          if(err) return callback(err);
          const dateModified = data;
          //
          const fileName = file.slice(0, -4);
          const newName = `${content}-${fileName}-${dateModified}`;
          console.log(newName);

          count++;
          if(count === files.length) callback(err);
        })
      });
      // get date modified
      // make new file with same content and new file name
      // delete old file
      // when the last file is done, invoke callback

    })
  });
}

module.exports = renameAllFiles;
