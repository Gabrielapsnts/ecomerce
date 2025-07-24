import bcrypt from 'bcrypt';
import db from '../db.js';

const authController = {
  showLogin: (req, res) => {
    res.render('login');
  },

  processLogin: async (req, res) => {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    try {
      // Verifica se o usuário já existe
      db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
          return res.status(500).send('Erro ao acessar o banco de dados');
        }
        if (!user) {
          // Cadastro: salva novo usuário
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          db.run(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword],
            function(err) {
              if (err) {
                return res.status(500).send('Erro ao salvar usuário');
              }
                res.redirect(`/products?welcome=${encodeURIComponent(name)}`);
            }
          );
        } else {
          // Login: verifica senha
          const senhaCorreta = await bcrypt.compare(password, user.password);
          if (senhaCorreta) {
              res.redirect(`/products?welcome=${encodeURIComponent(user.name)}`);
          } else {
            res.status(401).send('Senha incorreta');
          }
        }
      });
    } catch (err) {
      res.status(500).send('Erro ao processar senha');
    }
  }
};

export default authController;