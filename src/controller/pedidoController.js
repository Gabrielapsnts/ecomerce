import Pedido from '../models/Pedido.js';

const pedidoController = {
    showPedidos: async (req, res) => {
        try {
            const pedidos = await Pedido.findAll();
            res.render('pedidos', { pedidos });
        } catch (err) {
            res.status(500).send('Erro ao carregar pedidos');
        }
    },

    createPedido: async (req, res) => {
        try {
            const { produto_id, produto_nome, produto_preco, quantidade } = req.body;

            const lista_itens = [{
                id: produto_id,
                nome: produto_nome,
                preco: parseFloat(produto_preco),
                quantidade: parseInt(quantidade)
            }];

            const quantidade_itens = parseInt(quantidade);
            const preco_total = parseFloat(produto_preco) * parseInt(quantidade);

            // TODO: Implementar sistema de sessão para pegar o user_id real
            // Por enquanto usando user_id = 1 como exemplo
            const user_id = 1;

            await Pedido.create(user_id, quantidade_itens, lista_itens, preco_total);
            res.redirect('/pedidos');
        } catch (err) {
            res.status(500).send('Erro ao criar pedido');
        }
    },

    showPedido: async (req, res) => {
        try {
            const { id } = req.params;
            const pedido = await Pedido.findById(id);
            if (!pedido) {
                return res.status(404).send('Pedido não encontrado');
            }
            res.render('pedido', { pedido });
        } catch (err) {
            res.status(500).send('Erro ao carregar pedido');
        }
    }
};

export default pedidoController;
