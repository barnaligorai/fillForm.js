class Form {
  constructor(...query) {
    this.queries = query;
    this.index = 0;
    this.content = [];
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

  queryName() {
    return `Please enter your ${this.currentQuery().name} : `;
  }

  isFormFilled() {
    return this.queries.length === Object.keys(this.content).length;
  }

  updateContent(text) {
    this.content.push({ [this.currentQuery().name]: text });
  }

  formattedContent() {
    const addressLines = this.content.splice(-2, 2);
    const address = addressLines.map(addressLine => Object.values(addressLine));
    this.content.push({ ['address']: address.join('\n') });

    const formattedContent = {};
    this.content.forEach(field => {
      const [[name, content]] = Object.entries(field);
      formattedContent[name] = content;
    });
    return formattedContent;
  }
}

exports.Form = Form;
