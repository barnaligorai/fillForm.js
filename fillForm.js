const process = require('process');
const fs = require('fs');
const { Query } = require('./Query.js');
const { Form } = require('./Form.js');

const writeToFile = (data) => {
  fs.writeFileSync('./form.json', JSON.stringify(data), 'utf8');
  console.log('Thank you.');
};

const validateName = (text) => /[a-zA-Z ]{5,}/.test(text.trim());

const validatePhNo = (text) => /^\d{10}$/.test(text);

const identity = (text) => text;

const parseHobbies = (text) => text.split(',');

const validateDob = (text) => {
  const dobFormat = /\d{4}-\d{2}-\d{2}/;
  return dobFormat.test(text);
};

const validateAddress = (text) => text.length > 0;
const validateHobbies = (text) => text.length > 0;

const parseContent = (content, form, callBack) => {
  if (form.validate(content)) {
    const parsedContent = form.parseContent(content);
    form.updateContent(parsedContent);
    form.nextQuery();
  }

  if (form.isFormFilled()) {
    callBack(form.formattedContent());
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  process.stdout.write(form.queryName());
};

const readFromStdin = (form, callBack) => {
  process.stdout.write(form.queryName());

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    const content = chunk.split('\n');
    parseContent(content[0], form, callBack);
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
