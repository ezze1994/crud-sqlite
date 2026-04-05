const db = require("./db");

function clearProductos() {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM productos", [], function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function closeDb() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = {
  clearProductos,
  closeDb,
};