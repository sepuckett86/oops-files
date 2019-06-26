const fs = require('fs');

function getFileContent(fileName, callback) {
  fs.readFile(fileName, { encoding: 'utf8'}, (err, data) => {
    if(err) console.error(err);
    callback(err, data);
  })
}

module.exports = {
  getFileContent
}