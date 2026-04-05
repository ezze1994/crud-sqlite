class PositiveNumberRule {
  constructor(fieldName, label = null) {
    this.fieldName = fieldName;
    this.label = label || fieldName;
  }

  validate(data) {
    const value = Number(data[this.fieldName]);

    if (Number.isNaN(value)) {
      return `${this.label} debe ser numérico`;
    }

    if (value <= 0) {
      return `${this.label} debe ser mayor a 0`;
    }

    return null;
  }
}

module.exports = PositiveNumberRule;