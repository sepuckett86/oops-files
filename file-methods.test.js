const fs = require('fs');
const { 
  getFileContent, 
  makeFiles,
  getDateModified,
  readDirectory,
  renameFile
} = require('./file-methods');

describe('file methods', () => {
  beforeAll(done => {
    fs.mkdir('./fixtures', done);
  })
  afterAll(done => {
    fs.rmdir('./fixtures', done);
  })
  describe('single file methods', () => {
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

    it('gets date modified of file', done => {
      const file = '1.txt';
      const result = getDateModified(file, (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual(expect.any(String));
        done(err);
      });
    })

    it('renames file', done => {
      fs.readFile('1.txt', { encoding: 'utf8' }, (err, data) => {
        const oldFileContent = data;
        renameFile('1.txt', 'done.txt', (err) => {
          fs.readFile('done.txt', { encoding: 'utf8' }, (err, data) => {
            const newFileContent = data;
            expect(newFileContent).toEqual(oldFileContent);
            // For clean up purposes: 
            renameFile('done.txt', '1.txt', (err) => {
              done(err);
            })
          })
        })
      })
    })
  })

  describe('makeFiles', () => {
    afterEach(done => {
      fs.readdir('./fixtures', (err, files) => {
        if(files.length === 0) done(err);
        let unlinkedSoFar = 0;
        files.forEach(file => {
          fs.unlink('./fixtures/' + file, err => {
            if(err) return done(err);
            unlinkedSoFar++;
            if(unlinkedSoFar === files.length) {
              done();
            }
          })
        })
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

  describe('readDirectory', () => {
    beforeEach(done => {
      makeFiles('fixtures', 10, done);
    })

    afterEach(done => {
      fs.readdir('./fixtures', (err, files) => {
        if(files.length === 0) done(err);
        let unlinkedSoFar = 0;
        files.forEach(file => {
          fs.unlink('./fixtures/' + file, err => {
            if(err) return done(err);
            unlinkedSoFar++;
            if(unlinkedSoFar === files.length) {
              done();
            }
          })
        })
      });
    })

    it('returns an array of files in a directory', done => {
      readDirectory('fixtures', (err, data) => {
        if(err) return done(err);
        expect(data).toHaveLength(10);
        done();
      })
    })
  })
})