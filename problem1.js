/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require('fs');

function RandomFile(number) {
  for (let file = 1; file <= number; file += 1) {
    const stringName = {};

    for (let i = 1; i < 100000; i += 1) {
      stringName[i] = i;
    }

    const path = `../output1/random${file}.json`;
    const data = JSON.stringify(stringName);
    fs.promises
      .writeFile(path, data)
      .then(() => {
        console.log(`File created...! ${file}`);
        fs.promises.unlink(path);
      })
      .then(() => console.log(`File deleted...! ${file}`))
      .catch((err) => console.log('Error' + err));
  }
}

module.exports = RandomFile;
