/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the 
           new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. 
           Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of 
           the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in 
           that list simultaneously.
*/

const fs = require('fs').promises;
const path = require('path');
const pathUpperCase = 'output2/uppercase.txt';
const filePath = 'output2/filenames.txt';
const dirName = __dirname;

fs.writeFile(path.join(dirName, filePath), '');

async function getPromise() {
  const lipsumData = await fs.readFile(
    path.join(dirName, 'lipsum.txt'),
    'utf-8'
  );
  await fs.appendFile(path.join(dirName, filePath), `uppercase.txt\n`);
  await fs.writeFile(
    path.join(dirName, '/output2/uppercase.txt'),
    `${lipsumData.toUpperCase()}`
  );

  const lowerCase = await fs
    .readFile(path.join(dirName, pathUpperCase), 'utf-8')
    .then((data) =>
      data
        .toLowerCase()
        .split('.')
        .map((item) => item.trim())
        .join('.\n')
    );
  await fs.appendFile(path.join(dirName, filePath), `sentence.txt\n`);
  await fs.writeFile(
    path.join(dirName, '/output2/sentence.txt'),
    `${lowerCase}`
  );
  const sortedData = await fs
    .readFile(path.join(dirName, '/output2/sentence.txt'), 'utf-8')
    .then((data) =>
      data
        .replace(/[.,']+/g, '')
        .replace(/[\n]+/g, ' ')
        .trim()
        .split(' ')
        .sort()
        .join(' ')
    );

  await fs.appendFile(path.join(dirName, filePath), `sort.txt`);
  await fs.writeFile(path.join(dirName, '/output2/sort.txt'), `${sortedData}`);

  await fs.readFile(path.join(dirName, filePath), 'utf-8').then((data) => {
    data.split('\n').forEach((fileName) => {
      fs.unlink(`../output2/${fileName}`)
        .then(() => console.log(`${fileName} is deleted!`))
        .catch(() => console.log('Error'));
    });
  });
}

module.exports = getPromise;
