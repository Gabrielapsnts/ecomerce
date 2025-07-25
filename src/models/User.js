import db from '../db.js';

class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static create(name, email, password) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
            db.run(query, [name, email, password], function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    }

    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE email = ?`;
            db.get(query, [email], (err, row) => {
                if (err) reject(err);
                else resolve(row ? new User(row.id, row.name, row.email, row.password) : null);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE id = ?`;
            db.get(query, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row ? new User(row.id, row.name, row.email, row.password) : null);
            });
        });
    }
}

export default User;
