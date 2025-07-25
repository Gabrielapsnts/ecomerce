import db from '../db.js';

class Carrinho {
    constructor(id, produto_id, produto_nome, produto_preco, produto_image, quantidade, subtotal) {
        this.id = id;
        this.produto_id = produto_id;
        this.produto_nome = produto_nome;
        this.produto_preco = produto_preco;
        this.produto_image = produto_image;
        this.quantidade = quantidade;
        this.subtotal = subtotal;
    }

    static create(produto_id, produto_nome, produto_preco, produto_image, quantidade) {
        return new Promise((resolve, reject) => {
            const subtotal = produto_preco * quantidade;
            const query = `INSERT INTO carrinho (produto_id, produto_nome, produto_preco, produto_image, quantidade, subtotal) VALUES (?, ?, ?, ?, ?, ?)`;
            db.run(query, [produto_id, produto_nome, produto_preco, produto_image, quantidade, subtotal], function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM carrinho ORDER BY id DESC`;
            db.all(query, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(row => new Carrinho(
                    row.id,
                    row.produto_id,
                    row.produto_nome,
                    row.produto_preco,
                    row.produto_image,
                    row.quantidade,
                    row.subtotal
                )));
            });
        });
    }

    static findByProductId(produto_id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM carrinho WHERE produto_id = ?`;
            db.get(query, [produto_id], (err, row) => {
                if (err) reject(err);
                else resolve(row ? new Carrinho(
                    row.id,
                    row.produto_id,
                    row.produto_nome,
                    row.produto_preco,
                    row.produto_image,
                    row.quantidade,
                    row.subtotal
                ) : null);
            });
        });
    }

    static updateQuantity(produto_id, nova_quantidade) {
        return new Promise((resolve, reject) => {
            // Primeiro busca o preço do produto
            db.get('SELECT produto_preco FROM carrinho WHERE produto_id = ?', [produto_id], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }

                const novo_subtotal = row.produto_preco * nova_quantidade;
                const query = `UPDATE carrinho SET quantidade = ?, subtotal = ? WHERE produto_id = ?`;
                db.run(query, [nova_quantidade, novo_subtotal, produto_id], function (err) {
                    if (err) reject(err);
                    else resolve({ produto_id, quantidade: nova_quantidade, subtotal: novo_subtotal, changes: this.changes });
                });
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM carrinho WHERE id = ?`;
            db.run(query, [id], function (err) {
                if (err) reject(err);
                else resolve({ id, changes: this.changes });
            });
        });
    }

    static clear() {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM carrinho`;
            db.run(query, [], function (err) {
                if (err) reject(err);
                else resolve({ changes: this.changes });
            });
        });
    }

    static getTotal() {
        return new Promise((resolve, reject) => {
            const query = `SELECT SUM(subtotal) as total FROM carrinho`;
            db.get(query, [], (err, row) => {
                if (err) reject(err);
                else resolve(row.total || 0);
            });
        });
    }
}

export default Carrinho;
