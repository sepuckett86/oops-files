const fs = require('fs');

function getFileContent(fileName, callback) {
  fs.readFile(fileName, { encoding: 'utf8'}, (err, data) => {
    if(err) console.error(err);
    callback(err, data);
  })
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
  makeFiles
}