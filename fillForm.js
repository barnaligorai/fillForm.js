/* eslint-disable max-statements */

const process = require('process');
const fs = require('fs');
const { Query } = require('./Query.js');
const { Form } = require('./Form.js');

const writeToFile = (data) => {
  fs.writeFileSync('./form.json', JSON.stringify(data), 'utf8');
  console.log('Thank you.');
  process.exit(0);
};

const validateName = (text) => {
  return text.length > 4 &&
    text.split('').every(char => /[ a-zA-Z]+/.test(char.toLowerCase()));
};

const parseName = (text) => {
  return text;
};

const parseDob = (text) => {
  return text.split('-');
};

const parseHobbies = (text) => {
  return text.split(',');
};

const validateDob = (text) => {
  const dob = text.split('-');
  if (dob.length !== 3) {
    return false;
  }
  const lengths = [4, 2, 2];
  for (let index = 0; index < dob.length; index++) {
    if (dob[index].length != lengths[index]) {
      return false;
    }
  }
  return dob.every(field => /^\d+$/.test(field));
};

const validateHobbies = (text) => {
  const hobbies = text.split(',');
  if (hobbies < 1) {
    return false;
  }
  return true;
};

const parseContent = (content, form, fileData, callBack) => {
  if (form.validate(content)) {
    const parsedContent = form.parseContent(content);
    fileData[form.currentQuery().name] = parsedContent;
    form.nextQuery();
  }

  if (form.isFormFilled(fileData)) {
    callBack(fileData);
    process.exit(1);
  }
  form.showPrompt();
};

const readFromStdin = (form, callBack) => {
  const fileData = {};
  form.showPrompt();

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    const content = chunk.split('\n');
    parseContent(content[0], form, fileData, callBack);
  });
};

const main = () => {
  const nameField = new Query('Name', validateName, parseName);
  const dob = new Query('DOB', validateDob, parseDob);
  const hobbies = new Query('Hobbies', validateHobbies, parseHobbies);

  const form = new Form(nameField, dob, hobbies);
  readFromStdin(form, writeToFile);
};

main();
