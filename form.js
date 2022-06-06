class Form {
  constructor(...query) {
    this.queries = query;
    this.index = 0;
    this.content = {};
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

  isFormFilled() {
    return this.queries.length === Object.keys(this.content).length;
  }

  updateContent(text) {
    this.content[this.currentQuery().name] = text;
  }

  formatContent() {
    const address1 = 'address line 1';
    const address2 = 'address line 2';
    const address = this.content[address1].concat('\n', this.content[address2]);
    delete this.content[address1];
    delete this.content[address2];
    this.content['address'] = address;
  }
}

exports.Form = Form;
