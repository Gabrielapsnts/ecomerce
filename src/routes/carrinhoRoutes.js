import express from 'express';
import carrinhoController from '../controller/carrinhoController.js';

const router = express.Router();

router.get('/carrinho', carrinhoController.showCarrinho);
router.post('/carrinho/add', carrinhoController.addToCarrinho);
router.post('/carrinho/remove/:id', carrinhoController.removeFromCarrinho);
router.post('/carrinho/clear', carrinhoController.clearCarrinho);

export default router;
