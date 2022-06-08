class Field {
  constructor(name, validation, parse) {
    this.name = name;
    this.validation = validation;
    this.parse = parse;
  }

  isValid(text) {
    return this.validation(text);
  }
}

exports.Field = Field;
