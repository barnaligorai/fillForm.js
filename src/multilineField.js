const { Field } = require('./field.js');

class MultilineField extends Field {
  #responses;
  #prompts;
  #name;
  #parser;
  constructor(name, prompts, validator, parser) {
    super(name, prompts, validator, parser);
    this.#prompts = prompts;
    this.#parser = parser;
    this.#name = name;
    this.#responses = [];
  }
  prompt() {
    return this.#prompts[this.#responses.length];
  }

  fill(response) {
    this.#responses.push(response);
  }

  isFilled() {
    return this.#responses.length === this.#prompts.length;
  }

  #parse() {
    return this.#responses.map(response => this.#parser(response)).join('\n');
  }

  getEntry() {
    return [this.#name, this.#parse()];
  }
}

exports.MultilineField = MultilineField;
