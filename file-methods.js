const fs = require('fs');

function getFileContent(filePath, callback) {
  fs.readFile(filePath, { encoding: 'utf8'}, (err, data) => {
    if(err) console.error(err);
    callback(err, data);
  })
}

function getDateModified(filePath, callback) {
  fs.stat(filePath, (err, stats) => {
    if(!stats) return callback(err);
    const mtime = stats.mtime.toISOString();
    if(err) console.error(err);
    callback(err, mtime);
  });
}

function readDirectory(directoryPath, callback) {
  fs.readdir('fixtures', (err, data) => {
    if(err) console.error(err);
    callback(err, data);
  })
}

function renameFile(oldFilePath, newFilePath, callback) {
  // finish later
  callback();
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