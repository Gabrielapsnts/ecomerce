import Product from '../models/Product.js';

const productsController = {
  showProducts: async (req, res) => {
    try {
      const { category } = req.query;
      let products;

      if (category) {
        products = await Product.findByCategory(category);
      } else {
        products = await Product.findAll();
      }

      const categories = await Product.getCategories();

      res.render('products', {
        products,
        categories,
        selectedCategory: category || '',
        welcome: req.query.welcome
      });
    } catch (err) {
      res.status(500).send('Erro ao carregar produtos');
    }
  }
};

export default productsController;