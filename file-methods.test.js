const fs = require('fs');
const { getFileContent } = require('./file-methods');

describe('file methods', () => {
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