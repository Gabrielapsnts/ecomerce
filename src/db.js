import sqlite3 from 'sqlite3';
import path from 'path';

// Cliente do banco de dados SQLite
class DatabaseClient {
  constructor() {
    this.db = null;
    this.connect();
  }

  connect() {
    const dbPath = path.join(process.cwd(), 'ecomerce.db');
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao conectar com o banco de dados:', err.message);
      } else {
        console.log('Conectado ao banco de dados SQLite: ecomerce');
        this.initializeTables();
      }
    });
  }

  initializeTables() {
    // Criar tabela de usuários
    this.db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )`);

    // Criar tabela de produtos
    this.db.run(`CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      preco REAL
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar tabela produtos:', err.message);
      } else {
        this.migrateProductsTable();
      }
    });

    // Criar tabela de pedidos
    this.db.run(`CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      quantidade_itens INTEGER,
      lista_itens TEXT,
      preco_total REAL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar tabela pedidos:', err.message);
      } else {
        this.migratePedidosTable();
      }
    });

    // Criar tabela do carrinho
    this.db.run(`CREATE TABLE IF NOT EXISTS carrinho (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produto_id INTEGER,
      produto_nome TEXT,
      produto_preco REAL,
      produto_image TEXT,
      quantidade INTEGER,
      subtotal REAL
    )`);
  }

  migrateProductsTable() {
    // Verificar se as colunas image e category existem
    this.db.all("PRAGMA table_info(produtos)", (err, columns) => {
      if (err) {
        console.error('Erro ao verificar estrutura da tabela:', err.message);
        return;
      }

      const columnNames = columns.map(col => col.name);

      // Adicionar coluna image se não existir
      if (!columnNames.includes('image')) {
        this.db.run('ALTER TABLE produtos ADD COLUMN image TEXT', (err) => {
          if (err) {
            console.error('Erro ao adicionar coluna image:', err.message);
          } else {
            console.log('Coluna image adicionada com sucesso');
          }
        });
      }

      // Adicionar coluna category se não existir
      if (!columnNames.includes('category')) {
        this.db.run('ALTER TABLE produtos ADD COLUMN category TEXT', (err) => {
          if (err) {
            console.error('Erro ao adicionar coluna category:', err.message);
          } else {
            console.log('Coluna category adicionada com sucesso');
          }
        });
      }

      // Executar seed após a migração
      setTimeout(() => {
        this.seedProducts();
      }, 100);
    });
  }

  migratePedidosTable() {
    // Verificar se a coluna user_id existe na tabela pedidos
    this.db.all("PRAGMA table_info(pedidos)", (err, columns) => {
      if (err) {
        console.error('Erro ao verificar estrutura da tabela pedidos:', err.message);
        return;
      }

      const columnNames = columns.map(col => col.name);

      // Adicionar coluna user_id se não existir
      if (!columnNames.includes('user_id')) {
        this.db.run('ALTER TABLE pedidos ADD COLUMN user_id INTEGER', (err) => {
          if (err) {
            console.error('Erro ao adicionar coluna user_id:', err.message);
          } else {
            console.log('Coluna user_id adicionada com sucesso na tabela pedidos');
          }
        });
      }
    });
  }

  seedProducts() {
    // Verifica se já existem produtos na tabela
    this.db.get('SELECT COUNT(*) as count FROM produtos', (err, row) => {
      if (err) {
        console.error('Erro ao verificar produtos:', err.message);
        return;
      }

      // Se não há produtos, popula a tabela
      if (row.count === 0) {
        console.log('Populando tabela de produtos...');
        const allProducts = [
          { id: 1, name: 'Camiseta', price: 49.90, image: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg', category: 'Roupas' },
          { id: 2, name: 'Tênis', price: 199.90, image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=400', category: 'Calçados' },
          { id: 3, name: 'Boné', price: 29.90, image: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg', category: 'Acessórios' },
          { id: 4, name: 'Camiseta', price: 49.90, image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg', category: 'Roupas' },
          { id: 5, name: 'Calça', price: 89.90, image: 'https://images.pexels.com/photos/33073320/pexels-photo-33073320.jpeg', category: 'Roupas' },
          { id: 6, name: 'Calça', price: 89.90, image: 'https://images.pexels.com/photos/15759615/pexels-photo-15759615.jpeg', category: 'Roupas' },
          { id: 7, name: 'Moletom', price: 119.90, image: 'https://images.pexels.com/photos/6311235/pexels-photo-6311235.jpeg', category: 'Roupas' },
          { id: 8, name: 'Tênis', price: 199.90, image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&w=400', category: 'Calçados' },
          { id: 9, name: 'Pulseira', price: 10.90, image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&w=400', category: 'Acessórios' },
          { id: 10, name: 'Salto', price: 150.90, image: 'https://images.pexels.com/photos/3782786/pexels-photo-3782786.jpeg', category: 'Calçados' }
        ];

        const insertQuery = 'INSERT INTO produtos (nome, preco, image, category) VALUES (?, ?, ?, ?)';
        allProducts.forEach(product => {
          this.db.run(insertQuery, [product.name, product.price, product.image, product.category], (err) => {
            if (err) {
              console.error('Erro ao inserir produto:', err.message);
            }
          });
        });
        console.log('Produtos inseridos com sucesso!');
      }
    });
  }

  getDatabase() {
    return this.db;
  }

  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          console.error('Erro ao fechar o banco:', err.message);
        } else {
          console.log('Conexão com o banco fechada.');
        }
      });
    }
  }
}

// Instância única do cliente do banco
const dbClient = new DatabaseClient();

// Exporta a instância do banco para uso nos modelos
export default dbClient.getDatabase();
