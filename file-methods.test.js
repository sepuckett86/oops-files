const fs = require('fs');
const { getFileContent, makeFiles } = require('./file-methods');

describe('file methods', () => {
  describe('getFileContent', () => {
    beforeEach(done => {
      const dest = '1.txt';
      const content = 'shade';
      fs.writeFile(dest, content, done);
    })
  
    afterEach(done => {
      const dest = '1.txt';
      fs.unlink(dest, done);
    })

    it('gets content of file', done => {
      const file = '1.txt';
      const result = getFileContent(file, (err, data) => {
        expect(data).toBe('shade');
        done(err);
      });
    })
  })

  describe('makeFiles', () => {
    afterEach(done => {
      fs.readdir('./fixtures', (err, files) => {
        let unlinkedSoFar = 0;
        files.forEach(file => {
          fs.unlink('./fixtures/' + file, err => {
            unlinkedSoFar++;
            if(unlinkedSoFar === files.length) {
              done(err);
            }
          })
        })
        done(err);
      });
    })

    it('makes the correct number of files', done => {
      const directoryName = 'fixtures';
      const numberOfFiles = 10;
      makeFiles(directoryName, numberOfFiles, (err) => {
        expect(err).toBeFalsy();
        fs.readdir(directoryName, (err, files) => {
          expect(files).toHaveLength(numberOfFiles);
          done(err);
        });
      })
    })
  })
})