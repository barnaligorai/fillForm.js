const assert = require('assert');
const { Field } = require('../src/field.js');

const notEmpty = text => text.length > 0;
const alwaysTrue = () => true;
const identity = text => text;
const splitOnComma = text => text.split(',');

describe('Field', () => {

  describe('#prompt', () => {

    it('should give its prompt', () => {
      const nameField = new Field('name', 'Enter name', alwaysTrue, identity);
      assert.strictEqual(nameField.prompt(), 'Enter name');

      const dobField = new Field('dob', 'Enter dob', alwaysTrue, identity);
      assert.deepStrictEqual(dobField.prompt(), 'Enter dob');
    });
  });

  describe('#isValid', () => {

    it('should validate the input', () => {
      const nameField = new Field('name', 'Enter name', notEmpty, identity);
      assert.strictEqual(nameField.isValid('a'), true);

      const dobField = new Field('dob', 'Enter dob', notEmpty, identity);
      assert.strictEqual(dobField.isValid(''), false);
    });
  });

  describe('#parse', () => {

    it('should parse the input according to the given parser', () => {
      const nameField = new Field('name', 'Enter name', alwaysTrue, identity);
      nameField.fill('something');
      assert.strictEqual(nameField.parse(), 'something');

      const hobbiesField = new Field('hobbies', 'hobbies', alwaysTrue, splitOnComma);
      hobbiesField.fill('a,b');
      assert.deepStrictEqual(hobbiesField.parse(), ['a', 'b']);
    });
  });

  describe('#isFilled', () => {

    it('should return true when it is filled', () => {
      const nameField = new Field('name', 'Enter name', alwaysTrue, identity);
      nameField.fill('something');
      assert.strictEqual(nameField.isFilled(), true);
    });

    it('should return false when it is not filled', () => {
      const dobField = new Field('dob', 'Enter dob', alwaysTrue, identity);
      assert.deepStrictEqual(dobField.isFilled(), false);
    });
  });

  describe('#getEntry', () => {
    it('should return fieldName and its response/s', () => {
      const nameField = new Field('name', 'Enter name', alwaysTrue, identity);
      nameField.fill('Barnali');
      assert.deepStrictEqual(nameField.getEntry(), ['name', 'Barnali']);

      const hobbiesField = new Field('hobbies', 'hobbies', alwaysTrue, splitOnComma);
      hobbiesField.fill('coding,roaming');
      assert.deepStrictEqual(hobbiesField.getEntry(), ['hobbies', ['coding', 'roaming']]);
    });
  });
});
