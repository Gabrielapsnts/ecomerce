import bcrypt from 'bcrypt';
import User from '../models/User.js';

const authController = {
  showLogin: (req, res) => {
    res.render('login');
  },

  processLogin: async (req, res) => {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    try {
      // Verifica se o usuário já existe
      const user = await User.findByEmail(email);

      if (!user) {
        // Cadastro: salva novo usuário
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.create(name, email, hashedPassword);
        res.redirect(`/products?welcome=${encodeURIComponent(name)}`);
      } else {
        // Login: verifica senha
        const senhaCorreta = await bcrypt.compare(password, user.password);
        if (senhaCorreta) {
          res.redirect(`/products?welcome=${encodeURIComponent(user.name)}`);
        } else {
          res.status(401).send('Senha incorreta');
        }
      }
    } catch (err) {
      res.status(500).send('Erro ao processar login');
    }
  }
};

export default authController;