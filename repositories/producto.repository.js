const db = require("../config/db");

class ProductoRepository {
  getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM productos", [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM productos WHERE id = ?", [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  create({ nombre, precio }) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO productos (nombre, precio) VALUES (?, ?)";
      db.run(sql, [nombre, precio], function (err) {
        if (err) return reject(err);

        resolve({
          id: this.lastID,
          nombre,
          precio,
        });
      });
    });
  }

  update(id, { nombre, precio }) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE productos SET nombre = ?, precio = ? WHERE id = ?";
      db.run(sql, [nombre, precio, id], function (err) {
        if (err) return reject(err);

        resolve({
          changes: this.changes,
          producto: { id: Number(id), nombre, precio },
        });
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM productos WHERE id = ?", [id], function (err) {
        if (err) return reject(err);

        resolve({
          changes: this.changes,
        });
      });
    });
  }
}

module.exports = new ProductoRepository();