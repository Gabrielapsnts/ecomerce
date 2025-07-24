import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./ecomerce.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT
)`);

export default db;
