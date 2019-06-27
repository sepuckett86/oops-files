const fs = require('fs');
const { 
  makeFiles,
  deleteFiles
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
    deleteFiles('fixtures', done);
  })

  it('renames all files', () => {
    // check for length of file array to be the same
    // BONUS: check that name is correct using REGEX
  })
})