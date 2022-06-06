const process = require('process');
const fs = require('fs');
const { Query } = require('./Query.js');
const { Form } = require('./Form.js');

const writeToFile = (data) => {
  fs.writeFileSync('./form.json', JSON.stringify(data), 'utf8');
  console.log('Thank you.');
};

const validateName = (text) => {
  return text.trim().length > 4 &&
    text.split('').every(char => /[ a-zA-Z]+/.test(char.toLowerCase()));
};

const validateAddress = (text) => text.length > 0;

const validatePhNo = (text) => /^\d{10}$/.test(text);

const identity = (text) => text;

const parseHobbies = (text) => text.split(',');

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
    form.updateContent(parsedContent);
    form.nextQuery();
  }

  if (form.isFormFilled()) {
    form.formatContent();
    callBack(form.content);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  process.stdout.write(form.queryName());
};

const readFromStdin = (form, callBack) => {
  const fileData = {};

  process.stdout.write(form.queryName());

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    const content = chunk.split('\n');
    parseContent(content[0], form, fileData, callBack);
  });
};

const main = () => {
  const nameField = new Query('name', validateName, identity);
  const dob = new Query('dob', validateDob, identity);
  const hobbies = new Query('hobbies', validateHobbies, parseHobbies);
  const phNo = new Query('ph_no', validatePhNo, identity);
  const address1 = new Query('address line 1', validateAddress, identity);
  const address2 = new Query('address line 2', validateAddress, identity);

  const form = new Form(nameField, dob, hobbies, phNo, address1, address2);
  readFromStdin(form, writeToFile);
};

main();
