
import express from 'express';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import carrinhoRoutes from './routes/carrinhoRoutes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/', authRoutes);
app.use('/', productsRoutes);
app.use('/', pedidoRoutes);
app.use('/', carrinhoRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});