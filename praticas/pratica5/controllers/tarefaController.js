const tarefaModel = require('../models/tarefaModel');

function listar(req, res) {
    const resultado = tarefaModel.listar();
    res.json(resultado);
}

function criar(req, res) {
    const tarefa = req.body;
    const resultado = tarefaModel.criar(tarefa);
    res.status(201).json(resultado);
}

function buscarPeloId(req, res) {
    const tarefaId = req.params.idTarefa;
    const resultado = tarefaModel.buscarPeloId(tarefaId);
    if (resultado) {
        res.json(resultado);
    } else {
        res.status(404).json({ msg: "Tarefa não encontrada" });
    }
}

function atualizar(req, res) {
    const tarefaId = req.params.idTarefa;
    const novosDados = req.body;
    const resultado = tarefaModel.atualizar(tarefaId, novosDados);
    if (resultado) {
        res.json(resultado);
    } else {
        res.status(404).json({ msg: "Tarefa não encontrada" });
    }
}

function remover(req, res) {
    const tarefaId = req.params.idTarefa;
    const resultado = tarefaModel.remover(tarefaId);
    if (resultado) {
        res.status(204).send();
    } else {
        res.status(404).json({ msg: "Tarefa não encontrada" });
    }
}

module.exports = { listar, criar, buscarPeloId, atualizar, remover };