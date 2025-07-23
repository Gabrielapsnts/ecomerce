// Redireciona '/' para '/login'
import express from 'express';
import authController from '../controller/authController.js';
const router = express.Router();
""
router.get('/', (req, res) => {
  res.redirect('/login');
});



router.get('/login', authController.showLogin);

export default router;