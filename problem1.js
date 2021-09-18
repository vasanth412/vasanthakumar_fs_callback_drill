const fs = require('fs');

function RandomFile(number) {
  for (let file = 1; file <= number; file += 1) {
    const stringName = {};

    for (let i = 1; i < 100000; i += 1) {
      stringName[i] = i;
    }

    const path = `../output1/random${file}.json`;

    fs.writeFile(path, JSON.stringify(stringName), () => {
      console.log(`File created...!`);

      fs.unlink(path, () => {
        console.log(`File deleted...!`);
      });
    });
  }
}

module.exports = RandomFile;
