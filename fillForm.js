/* eslint-disable max-len */
const chalk = require('chalk');
const boxen = require('boxen');

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
    console.log(chalk.redBright('Invalid response'));
  }

  if (!form.isFilled()) {
    console.log(chalk.yellowBright(form.getPrompt()));
    return;
  }

  callBack(form.getResponses());

  console.log(boxen(
    chalk.greenBright('Thank you.'),
    { margin: { top: 1, left: 20 }, borderStyle: 'double' })
  );

  process.stdin.destroy();
};

const createForm = () => {
  const nameField = new Field('name', 'Please enter your name', validateName, identity);
  const dobField = new Field('dob', 'Please enter your dob', validateDob, identity);
  const hobbiesField = new Field('hobbies', 'Please enter your hobbies', notEmpty, splitOnComma);
  const phNoField = new Field('ph_no', 'Please enter your ph_no', validatePhNo, identity);

  return new Form(nameField, dobField, hobbiesField, phNoField);
};

const main = () => {
  const form = createForm();

  console.log(chalk.yellowBright(form.getPrompt()));

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (text) => {
    const responses = text.trim().split('\n');
    responses.forEach(response =>
      registerResponse(response.trim(), form, writeToFile));
  });
};

main();
