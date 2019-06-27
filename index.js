const fs = require('fs');
const { 
  getFileContent, 
  makeFiles,
  getDateModified,
  readDirectory,
  renameFile
} = require('./file-methods');

function renameAllFiles(directory, callback) {
  readDirectory('fixtures', (err, files) => {
    if(err) return callback(err);
    let count = 0;
    files.forEach(file => {
      getFileContent(`fixtures/${file}`, (err, data) => {
        if(err) return callback(err);
        const content = data;
        getDateModified(`fixtures/${file}`, (err, data) => {
          if(err) return callback(err);
          const dateModified = data;
          const fileName = file.slice(0, -4);
          const newName = `${content}-${fileName}-${dateModified}`;
          renameFile(`fixtures/${file}`, `fixtures/${newName}`, (err) => {
            if(err) return callback(err);
            count++;
            if(count === files.length) callback(err);
          })
        })
      });
    })
  });
}

module.exports = renameAllFiles;
