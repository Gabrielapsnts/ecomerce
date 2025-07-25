import express from 'express';
import pedidoController from '../controller/pedidoController.js';

const router = express.Router();

router.get('/pedidos', pedidoController.showPedidos);
router.post('/pedidos', pedidoController.createPedido);
router.get('/pedidos/:id', pedidoController.showPedido);

export default router;
