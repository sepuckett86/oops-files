const fs = require('fs');
const { 
  makeFiles,
  deleteFiles,
  readDirectory
} = require('./file-methods');
const renameAllFiles = require('./index');

describe('index', () => {
  beforeAll(done => {
    fs.mkdir('./fixtures', done);
  })
  
  beforeEach(done => {
    makeFiles('fixtures', 10, done);
  })

  afterAll(done => {
    fs.rmdir('./fixtures', done);
  })

  afterEach(done => {
    deleteFiles('fixtures', done);
  })

  it('renames all files', done => {
    readDirectory('fixtures', (err, data) => {
      if(err) done(err);
      const originalLength = data.length;
      // check for length of file array to be the same
      renameAllFiles('fixtures', (err) => {
        if(err) done(err);
        readDirectory('fixtures', (err, data) => {
          expect(data).toHaveLength(originalLength);
          done(err);
        })
      })
    })
    // BONUS: check that name is correct using REGEX
  })
})