class Form {
  #fields;
  #index;

  constructor(...fileds) {
    this.#fields = fileds;
    this.#index = 0;
  }

  #currentField() {
    return this.#fields[this.#index];
  }

  #nextField() {
    this.#index++;
  }

  getPrompt() {
    return this.#currentField().prompt();
  }

  isFilled() {
    return this.#fields.every(field => field.isFilled());
  }

  fillField(response) {
    if (!this.#currentField().isValid(response)) {
      throw new Error('Invalid response');
    }

    this.#currentField().fill(response);
    this.#nextField();
  }

  getResponses() {
    const responses = {};
    this.#fields.forEach(field => {
      const [name, response] = field.getEntry();
      responses[name] = response;
    }
    );
    return responses;
  }
}

exports.Form = Form;
