const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

// Rota de Login (Pública)
router.post('/login', authController.login);

// Rotas de Pedido (Protegidas com Token)
router.post('/order', authMiddleware, orderController.createOrder);
router.get('/order/:id', authMiddleware, orderController.getOrder);
router.delete('/order/:id', authMiddleware, orderController.deleteOrder);

module.exports = router;