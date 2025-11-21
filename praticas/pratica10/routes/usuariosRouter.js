const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');
const auth = require('../middlewares/authMiddleware');

router.post('/', controller.criar);
router.post('/login', controller.entrar);
router.post('/renovar', auth.verificarToken, controller.renovar);
router.delete('/:id', auth.verificarToken, controller.remover);

module.exports = router;