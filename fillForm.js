const fs = require('fs');
const { Field } = require('./src/field.js');
const { Form } = require('./src/Form.js');

const writeToFile = (filledForm) => {
  fs.writeFileSync('./form.json', JSON.stringify(filledForm), 'utf8');
};

const validateName = (text) => /[a-zA-Z ]{5,}/.test(text.trim());

const validatePhNo = (text) => /^\d{10}$/.test(text);

const validateDob = (text) => /\d{4}-\d{2}-\d{2}/.test(text);

const notEmpty = (text) => text.length > 0;

const identity = (text) => text;

const splitOnComma = (text) => text.split(',');

const registerResponse = (response, form, callBack) => {
  try {
    form.fillField(response);
  } catch (error) {
    console.log('Invalid response');
  }

  if (!form.isFilled()) {
    console.log(form.showPrompt());
    return;
  }

  callBack(form.getResponses());

  console.log('Thank you.');

  process.stdin.destroy();
};

const createForm = () => {
  const nameField = new Field('name', validateName, identity);
  const dobField = new Field('dob', validateDob, identity);
  const hobbiesField = new Field('hobbies', notEmpty, splitOnComma);
  const phNoField = new Field('ph_no', validatePhNo, identity);

  return new Form(nameField, dobField, hobbiesField, phNoField);
};

const main = () => {
  const form = createForm();

  console.log(form.showPrompt());

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (text) => {
    const responses = text.trim().split('\n');
    responses.forEach(response =>
      registerResponse(response.trim(), form, writeToFile));
  });
};

main();
