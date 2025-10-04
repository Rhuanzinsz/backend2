const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

router.get('/', tarefaController.listar);
router.get('/:idTarefa', tarefaController.buscarPeloId);
router.post('/', tarefaController.criar);
router.put('/:idTarefa', tarefaController.atualizar);
router.delete('/:idTarefa', tarefaController.remover);

module.exports = router;