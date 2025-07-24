import express from 'express';
import productsController from '../controller/productsController.js';
const router = express.Router();

router.get('/products', productsController.showProducts);

export default router;