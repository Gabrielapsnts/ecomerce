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

const productsController = {
  showProducts: (req, res) => {
    const { category } = req.query;
    let products = allProducts;
    if (category) {
      products = allProducts.filter(p => p.category === category);
    }
    // Pega todas as categorias únicas para o filtro
    const categories = [...new Set(allProducts.map(p => p.category))];
      res.render('products', { products, categories, selectedCategory: category, welcome: req.query.welcome });
  }
};

export default productsController;