class RequiredRule {
  constructor(fieldName, label = null) {
    this.fieldName = fieldName;
    this.label = label || fieldName;
  }

  validate(data) {
    const value = data[this.fieldName];

    if (value === undefined || value === null || value === "") {
      return `${this.label} es obligatorio`;
    }

    return null;
  }
}

module.exports = RequiredRule;