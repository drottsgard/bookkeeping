import Database from "better-sqlite3";

const db = new Database("bookkeeping.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    parent_id INTEGER,
    balance REAL NOT NULL DEFAULT 0,
    FOREIGN KEY (parent_id) REFERENCES accounts(id)
  );
`);

export default db;
