class Field {
  #name;
  #prompt;
  #validator;
  #parser;
  #response;

  constructor(name, prompt, validator, parser) {
    this.#name = name;
    this.#prompt = prompt;
    this.#validator = validator;
    this.#parser = parser;
    this.#response = null;
  }

  prompt() {
    return this.#prompt;
  }

  isValid(text) {
    return this.#validator(text);
  }

  // parse() {
  //   return this.#parser(this.#response);
  // }

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
