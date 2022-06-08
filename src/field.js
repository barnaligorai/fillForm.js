class Field {
  #name;
  #validate;
  #parser;
  #response;

  constructor(name, validate, parser) {
    this.#name = name;
    this.#validate = validate;
    this.#parser = parser;
    this.#response = null;
  }

  prompt() {
    return this.#name;
  }

  isValid(text) {
    return this.#validate(text);
  }

  parse() {
    return this.#parser(this.response);
  }

  fill(response) {
    this.#response = response;
  }

  isFilled() {
    return this.#response !== null;
  }

  getEntry() {
    return [this.#name, this.#parser(this.#response)];
  }
}

exports.Field = Field;
