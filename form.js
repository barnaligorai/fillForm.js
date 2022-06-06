class Form {
  constructor(...query) {
    this.queries = query;
    this.index = 0;
  }
  currentQuery() {
    return this.queries[this.index];
  }

  nextQuery() {
    this.index++;
  }

  validate(text) {
    return this.currentQuery().isValid(text);
  }

  parseContent(text) {
    return this.currentQuery().parse(text);
  }

  showPrompt() {
    console.log(`Please enter your ${this.currentQuery().name} :`);
  }
  isFormFilled(records) {
    return this.queries.length === Object.keys(records).length;
  }

}

exports.Form = Form;
