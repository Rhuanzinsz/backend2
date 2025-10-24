const express = require('express'); //
const router = express.Router(); //
const produtosController = require('../controllers/produtosController.js'); //

// Rota para criar (POST) [cite: 60]
router.post('/', produtosController.criar); //

// Rota para listar (GET) [cite: 62]
router.get('/', produtosController.listar); //

// Rota para buscar por ID (GET /:id) [cite: 64]
router.get('/:id', produtosController.buscar, produtosController.exibir); //

// Rota para atualizar (PUT /:id) [cite: 66]
router.put('/:id', produtosController.buscar, produtosController.atualizar); //

// Rota para remover (DELETE /:id) [cite: 68]
router.delete('/:id', produtosController.buscar, produtosController.remover); //

module.exports = router; //