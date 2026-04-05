const RequiredRule = require("./rules/required.rule");
const PositiveNumberRule = require("./rules/positiveNumber.rule");

function validateProducto(data) {
  const rules = [
    new RequiredRule("nombre", "El nombre"),
    new RequiredRule("precio", "El precio"),
    new PositiveNumberRule("precio", "El precio"),
  ];

  const errors = [];

  for (const rule of rules) {
    const error = rule.validate(data);
    if (error) {
      errors.push(error);
    }
  }

  return errors;
}

module.exports = {
  validateProducto,
};