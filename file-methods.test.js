const fs = require('fs');

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
  
  it('gets content of file', () => {
    const file = '1.txt';
    const result = getFileContent(file);
    expect(result).toBe('shade');
  })
})