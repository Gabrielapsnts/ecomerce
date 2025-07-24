
import express from 'express';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));


app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

import productsRoutes from './routes/productsRoutes.js';
app.use('/', productsRoutes);