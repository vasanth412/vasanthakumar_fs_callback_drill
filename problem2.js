const fs = require('fs');
const path = require('path');
const pathUpperCase = '/output2/uppercase.txt';
const filePath = 'output2/filenames.txt';
const dirName = __dirname;

fs.writeFileSync(path.join(dirName, filePath), '');

function cb() {
  fs.readFile(path.join(dirName, 'lipsum.txt'), 'utf-8', callback1);
}

function callback1(err, data) {
  fs.appendFileSync(path.join(dirName, filePath), `uppercase.txt\n`);
  fs.writeFile(
    '../output2/uppercase.txt',
    `${data.toUpperCase()}`,
    upperCaseFile
  );
}

function upperCaseFile() {
  fs.readFile(path.join(dirName, pathUpperCase), 'utf-8', callback2);
}

function callback2(err, data) {
  data = data
    .toLowerCase()
    .split('.')
    .map((item) => item.trim())
    .join('.\n');

  fs.appendFileSync(path.join(dirName, filePath), `sentence.txt\n`);

  fs.writeFile(
    path.join(dirName, '/output2/sentence.txt'),
    `${data}`,
    sentence
  );
}

function sentence() {
  fs.readFile(path.join(dirName, '/output2/sentence.txt'), 'UTF-8', callback3);
}

function callback3(err, data) {
  data = data
    .replace(/[.,']+/g, '')
    .replace(/[\n]+/g, ' ')
    .trim()
    .split(' ');
  data = data.sort().join(' ');
  fs.appendFileSync(path.join(dirName, filePath), `sort.txt`);
  fs.writeFile(path.join(dirName, '/output2/sort.txt'), `${data}`, sort);
}

function sort() {
  setTimeout(() => {
    fs.readFile(path.join(dirName, filePath), 'utf-8', fileDelete);
  }, 2000);
}

function fileDelete(err, data) {
  data = data.split('\n');
  data.forEach((fileName) => {
    fs.unlink(`../output2/${fileName}`, () => {
      console.log(`${fileName} is deleted!`);
    });
  });
}
module.exports = cb;
