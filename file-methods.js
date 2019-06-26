const fs = require('fs');

function getFileContent(filePath, callback) {
  fs.readFile(filePath, { encoding: 'utf8'}, (err, data) => {
    if(err) console.error(err);
    callback(err, data);
  })
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
  fs.readdir('fixtures', (err, data) => {
    if(err) console.error(err);
    callback(err, data);
  })
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

module.exports = {
  getFileContent,
  makeFiles,
  getDateModified,
  readDirectory,
  renameFile
}