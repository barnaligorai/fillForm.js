const process = require('process');
const fs = require('fs');
const { Field } = require('./src/field.js');
const { Form } = require('./src/Form.js');

const writeToFile = (data) => {
  fs.writeFileSync('./form.json', JSON.stringify(data), 'utf8');
  console.log('Thank you.');
};

const validateName = (text) => /[a-zA-Z ]{5,}/.test(text.trim());

const validatePhNo = (text) => /^\d{10}$/.test(text);

const validateDob = (text) => /\d{4}-\d{2}-\d{2}/.test(text);

const notEmpty = (text) => text.length > 0;

const identity = (text) => text;

const splitONComma = (text) => text.split(',');
const parseContent = (content, form, callBack) => {
  if (form.validate(content)) {
    const parsedContent = form.parseContent(content);
    form.updateContent(parsedContent);
    form.nextQuery();
  }

  if (form.isFormFilled()) {
    callBack(form.formattedContent());
    // eslint-disable-next-line no-process-exit
    process.exit();

  }

  process.stdout.write(form.queryName());
};

const readFromStdin = (form, callBack) => {
  process.stdout.write(form.queryName());

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    const lines = chunk.trim().split('\n');
    // parseContent(lines[0], form, callBack);
    lines.forEach(line => parseContent(line, form, callBack));
  });
};

const createForm = () => {
  const nameField = new Field('name', validateName, identity);
  const dob = new Field('dob', validateDob, identity);
  const hobbies = new Field('hobbies', notEmpty, splitONComma);
  const phNo = new Field('ph_no', validatePhNo, identity);
  const address1 = new Field('address line 1', notEmpty, identity);
  const address2 = new Field('address line 2', notEmpty, identity);
  return new Form(nameField, dob, hobbies, phNo, address1, address2);
};

const main = () => {
  const form = createForm();
  readFromStdin(form, writeToFile);
};

main();
