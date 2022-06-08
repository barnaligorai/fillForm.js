const { Form } = require('../src/form.js');
const { Field } = require('../src/field.js');
const assert = require('assert');

const notEmpty = text => text.length > 0;
const alwaysTrue = () => true;
const identity = text => text;
const splitOnComma = text => text.split(',');

describe('Form', () => {
  describe('#showPrompt', () => {
    it('should display the prompt of the current field', () => {
      const nameField = new Field('name', 'Enter name', alwaysTrue, identity);
      const dobField = new Field('dob', 'Enter dob', alwaysTrue, identity);

      const form = new Form(nameField, dobField);
      assert.strictEqual(form.getPrompt(), 'Enter name');

      form.fillField('name');
      assert.strictEqual(form.getPrompt(), 'Enter dob');
    });
  });

  describe('#isFilled', () => {
    it('should return true when form is filled', () => {
      const nameField = new Field('name', 'Enter name', alwaysTrue, identity);

      const form = new Form(nameField);
      assert.strictEqual(form.isFilled(), false);

      form.fillField('Barnali');
      assert.strictEqual(form.isFilled(), true);
    });

    it('should return false when form is not filled', () => {
      const nameField = new Field('name', 'Enter name', alwaysTrue, identity);

      const form = new Form(nameField);
      assert.strictEqual(form.isFilled(), false);
    });
  });

  describe('#fillField', () => {
    it('should fill the form when input is valid', () => {
      const nameField = new Field('name', 'Enter name', alwaysTrue, identity);

      const form = new Form(nameField);
      form.fillField('Barnali');

      assert.deepStrictEqual(form.getResponses(), { name: 'Barnali' });
    });

    it('should throw error when input is not valid', () => {
      const nameField = new Field('name', 'Enter name', notEmpty, identity);

      const form = new Form(nameField);
      assert.throws(() => form.fillField(''), new Error('Invalid response'));
    });
  });

  describe('#getResponses', () => {
    it('should return the filled form', () => {
      const hobbiesField =
        new Field('hobbies', 'Enter hobbies', alwaysTrue, splitOnComma);

      const form = new Form(hobbiesField);
      form.fillField('coding,drawing');

      assert.deepStrictEqual(
        form.getResponses(),
        { hobbies: ['coding', 'drawing'] }
      );
    });
  });
});
