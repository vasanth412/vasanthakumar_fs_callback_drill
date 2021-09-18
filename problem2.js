const fs = require('fs');
const path = require('path');
const pathUpperCase = 'output2/uppercase.txt';
const filePath = 'output2/filenames.txt';

fs.writeFileSync(path.join(__dirname, filePath), '');

function getPromise() {
  fs.promises
    .readFile(path.join(__dirname, 'lipsum.txt'), 'utf-8')
    .then((data) => {
      fs.appendFileSync(path.join(__dirname, filePath), `uppercase.txt\n`);
      fs.promises.writeFile(
        '../output2/uppercase.txt',
        `${data.toUpperCase()}`
      );
    })
    .then(() =>
      fs.promises.readFile(path.join(__dirname, pathUpperCase), 'utf-8')
    )
    .then((data) => {
      data = data
        .toLowerCase()
        .split('.')
        .map((item) => item.trim())
        .join('.\n');

      fs.appendFileSync(path.join(__dirname, filePath), `sentence.txt\n`);

      fs.promises.writeFile(
        path.join(__dirname, '/output2/sentence.txt'),
        `${data}`
      );
    })
    .then(() =>
      fs.promises.readFile(
        path.join(__dirname, '/output2/sentence.txt'),
        'utf-8'
      )
    )
    .then((data) => {
      let content = data
        .replace(/[.,']+/g, '')
        .replace(/[\n]+/g, ' ')
        .trim()
        .split(' ');
      content = content.sort().join(' ');

      fs.appendFileSync(path.join(__dirname, filePath), `sort.txt`);
      fs.promises.writeFile(
        path.join(__dirname, '/output2/sort.txt'),
        `${content}`
      );
    })
    .then(() => fs.promises.readFile(path.join(__dirname, filePath), 'utf-8'))
    .then((data) => {
      let content = data.split('\n');
      content.forEach((fileName) => {
        fs.promises
          .unlink(`../output2/${fileName}`)
          .then(() => console.log(`${fileName} is deleted!`))
          .catch((err) => console.log('Error'));
      });
    })
    .catch((err) => console.log('Error'));
}

module.exports = getPromise;
