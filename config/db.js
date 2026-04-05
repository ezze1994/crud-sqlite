const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath =
  process.env.NODE_ENV === "test"
    ? path.resolve(__dirname, "../../database.test.sqlite")
    : path.resolve(__dirname, "../../database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al conectar con SQLite:", err.message);
  }
});

function initDb() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        precio REAL NOT NULL
      )
    `);
  });
}

initDb();

module.exports = db;