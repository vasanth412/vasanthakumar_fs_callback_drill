const fs = require('fs');

function RandomFile(number) {
  for (let file = 1; file <= number; file += 1) {
    const stringName = {};
    for (let i = 1; i < 1000000; i++) {
      stringName[i] = i;
    }
    const path = `../output1/random${file}.json`;
    createRandomFile(path, JSON.stringify(stringName));
  }
}

function createRandomFile(path, stringName) {
  fs.writeFile(path, stringName, (error) => {
    console.log(`File created...!`);

    removeRandomFile(path);
  });
}

function removeRandomFile(path) {
  fs.unlink(path, () => {
    console.log(`File deleted...!`);
  });
}

module.exports = RandomFile;
