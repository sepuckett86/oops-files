const fs = require('fs');
const { 
  makeFiles
} = require('./file-methods');

describe('index', () => {
  beforeAll(done => {
    fs.mkdir('./fixtures', done);
  })
  
  afterAll(done => {
    fs.rmdir('./fixtures', done);
  })

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
  
  it('renames all files', () => {
    // check for length of file array to be the same
    // BONUS: check that name is correct using REGEX
  })
})