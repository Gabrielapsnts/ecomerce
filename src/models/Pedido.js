import db from '../db.js';

class Pedido {
    constructor(id, quantidade_itens, lista_itens, preco_total) {
        this.id = id;
        this.quantidade_itens = quantidade_itens;
        this.lista_itens = lista_itens;
        this.preco_total = preco_total;
    }

    static create(quantidade_itens, lista_itens, preco_total) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO pedidos (quantidade_itens, lista_itens, preco_total) VALUES (?, ?, ?)`;
            db.run(query, [quantidade_itens, JSON.stringify(lista_itens), preco_total], function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM pedidos`;
            db.all(query, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(row => new Pedido(
                    row.id,
                    row.quantidade_itens,
                    JSON.parse(row.lista_itens),
                    row.preco_total
                )));
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM pedidos WHERE id = ?`;
            db.get(query, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row ? new Pedido(
                    row.id,
                    row.quantidade_itens,
                    JSON.parse(row.lista_itens),
                    row.preco_total
                ) : null);
            });
        });
    }
}

export default Pedido;
