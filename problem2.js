const fs = require('fs');
const path = require('path');
const pathUpperCase = '/output2/uppercase.txt';
const filePath = 'output2/filenames.txt';

fs.writeFileSync(path.join(__dirname, filePath), '');

function cb() {
  fs.readFile(path.join(__dirname, 'lipsum.txt'), 'utf8', callback1);
}

function callback1(err, data) {
  fs.appendFileSync(path.join(__dirname, filePath), `uppercase.txt\n`);
  fs.writeFile(
    '../output2/uppercase.txt',
    `${data.toUpperCase()}`,
    upperCaseFile
  );
}

function upperCaseFile(err) {
  fs.readFile(path.join(__dirname, pathUpperCase), 'utf-8', callback2);
}

function callback2(err, data) {
  data = data
    .toLowerCase()
    .split('.')
    .map((item) => item.trim())
    .join('.\n');

  fs.appendFileSync(path.join(__dirname, filePath), `sentence.txt\n`);

  fs.writeFile(
    path.join(__dirname, '/output2/sentence.txt'),
    `${data}`,
    sentence
  );
}

function sentence(err) {
  fs.readFile(
    path.join(__dirname, '/output2/sentence.txt'),
    'UTF-8',
    callback3
  );
}

function callback3(err, data) {
  data = data
    .replace(/[.,']+/g, '')
    .replace(/[\n]+/g, ' ')
    .trim()
    .split(' ');
  data = data.sort();
  fs.appendFileSync(path.join(__dirname, filePath), `sort.txt`);
  fs.writeFile(path.join(__dirname, '/output2/sort.txt'), `${data}`, sort);
}

function sort(err) {
  setTimeout(() => {
    fs.readFile(path.join(__dirname, filePath), 'utf-8', fileDelete);
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
