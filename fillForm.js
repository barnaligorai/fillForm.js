/* eslint-disable max-statements */
const process = require('process');
const fs = require('fs');

const writeToFile = (data) => {
  fs.writeFileSync('./form.json', JSON.stringify(data), 'utf8');
  console.log('Thank you.');
  process.exit(0);
};

const parseContent = (content, fileData, callBack) => {
  if (Object.keys(fileData).length === 0) {
    fileData['name'] = content;
    console.log('Please enter your DOB : [yyyy-mm-dd]');
    return;
  }

  if (Object.keys(fileData).length === 1) {
    fileData['DOB'] = content;
    console.log('Please enter your hobbies :');
    return;
  }

  const hobbies = content.split(',');
  fileData.hobbies = hobbies;
  callBack(fileData);
};

const readFromStdin = (callBack) => {
  const fileData = {};
  process.stdin.setEncoding = 'utf8';

  let input = '';

  process.stdin.on('data', (chunk) => {
    input += chunk;
    const content = input.split('\n');
    input = '';
    parseContent(content[0], fileData, callBack);
  });
};

const main = () => {
  console.log('Please enter your name : ');
  readFromStdin(writeToFile);
};

main();
