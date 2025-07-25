import Carrinho from '../models/Carrinho.js';

const carrinhoController = {
    showCarrinho: async (req, res) => {
        try {
            const itens = await Carrinho.findAll();
            const total = await Carrinho.getTotal();
            res.render('carrinho', { itens, total });
        } catch (err) {
            res.status(500).send('Erro ao carregar carrinho');
        }
    },

    addToCarrinho: async (req, res) => {
        try {
            const { produto_id, produto_nome, produto_preco, produto_image, quantidade } = req.body;

            // Verificar se o produto já está no carrinho
            const itemExistente = await Carrinho.findByProductId(produto_id);

            if (itemExistente) {
                // Se já existe, atualiza a quantidade
                const novaQuantidade = itemExistente.quantidade + parseInt(quantidade);
                await Carrinho.updateQuantity(produto_id, novaQuantidade);
            } else {
                // Se não existe, adiciona novo item
                await Carrinho.create(
                    produto_id,
                    produto_nome,
                    parseFloat(produto_preco),
                    produto_image,
                    parseInt(quantidade)
                );
            }

            res.redirect('/carrinho');
        } catch (err) {
            res.status(500).send('Erro ao adicionar ao carrinho');
        }
    },

    removeFromCarrinho: async (req, res) => {
        try {
            const { id } = req.params;
            await Carrinho.delete(id);
            res.redirect('/carrinho');
        } catch (err) {
            res.status(500).send('Erro ao remover do carrinho');
        }
    },

    clearCarrinho: async (req, res) => {
        try {
            await Carrinho.clear();
            res.redirect('/carrinho');
        } catch (err) {
            res.status(500).send('Erro ao limpar carrinho');
        }
    }
};

export default carrinhoController;
