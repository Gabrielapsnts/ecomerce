import Product from '../models/Product.js';

const productsController = {
  showProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.render('products', { products, welcome: req.query.welcome });
    } catch (err) {
      res.status(500).send('Erro ao carregar produtos');
    }
  }
};

export default productsController;