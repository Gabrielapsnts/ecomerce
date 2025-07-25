import db from '../db.js';

class Product {
    constructor(id, nome, preco, image, category) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.image = image;
        this.category = category;
    }

    static create(nome, preco, image, category) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO produtos (nome, preco, image, category) VALUES (?, ?, ?, ?)`;
            db.run(query, [nome, preco, image, category], function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM produtos`;
            db.all(query, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(row => new Product(row.id, row.nome, row.preco, row.image, row.category)));
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM produtos WHERE id = ?`;
            db.get(query, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row ? new Product(row.id, row.nome, row.preco, row.image, row.category) : null);
            });
        });
    }

    static findByCategory(category) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM produtos WHERE category = ?`;
            db.all(query, [category], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(row => new Product(row.id, row.nome, row.preco, row.image, row.category)));
            });
        });
    }

    static getCategories() {
        return new Promise((resolve, reject) => {
            const query = `SELECT DISTINCT category FROM produtos WHERE category IS NOT NULL ORDER BY category`;
            db.all(query, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(row => row.category));
            });
        });
    }
}

export default Product;
