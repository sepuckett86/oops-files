const fs = require('fs');

function getFileContent(filePath, callback) {
  fs.readFile(filePath, { encoding: 'utf8'}, callback)
}

function getDateModified(filePath, callback) {
  fs.stat(filePath, (err, stats) => {
    // short circuit
    // if first is true, evaluates and returns second
    // if first is false, returns first and never evaluates second
    // false && true
    callback(err, stats && stats.mtime.toISOString());
  });
}

function readDirectory(directoryPath, callback) {
  fs.readdir('fixtures', callback)
}

function renameFile(oldFilePath, newFilePath, callback) {
  fs.rename(oldFilePath, newFilePath, err => {
    callback(err);
  });
}

function makeFiles(directoryName, numberOfFiles, callback) {
  let writtenSoFar = 0
  for(let i = 0; i < numberOfFiles; i++) {
    const fileName = i;
    const animals = [
      'sloth', 
      'manatee',
      'meerkat',
      'sea-turtle',
      'lemur'
    ];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

    fs.writeFile(`./${directoryName}/${fileName}.txt`, randomAnimal, err => {
      if(err) console.error(err);
      writtenSoFar++;

      // call callback at the end
      if(writtenSoFar === numberOfFiles) {
        callback(err);
      }
    })
  }
}

function deleteFiles(directoryName, callback) {
  fs.readdir(directoryName, (err, files) => {
    if(files.length === 0) done(err);
    let unlinkedSoFar = 0;
    files.forEach(file => {
      fs.unlink('./fixtures/' + file, err => {
        if(err) return done(err);
        unlinkedSoFar++;
        if(unlinkedSoFar === files.length) {
          callback(err);
        }
      })
    })
  });
}

module.exports = {
  getFileContent,
  makeFiles,
  getDateModified,
  readDirectory,
  renameFile,
  deleteFiles
}