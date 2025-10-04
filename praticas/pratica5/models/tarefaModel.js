const tarefas = [];
let idCounter = 0;

function listar() {
    return tarefas;
}

function criar(tarefa) {
    const novaTarefa = { ...tarefa };
    novaTarefa.id = Math.random().toString(36).substr(2, 4); // Gera ID aleatório
    tarefas.push(novaTarefa);
    return novaTarefa;
}

function buscarPeloId(tarefaId) {
    return tarefas.find(t => t.id === tarefaId) || null;
}

function atualizar(tarefaId, novosDados) {
    const index = tarefas.findIndex(t => t.id === tarefaId);
    if (index === -1) {
        return null;
    }
    tarefas[index] = { ...tarefas[index], ...novosDados };
    return tarefas[index];
}

function remover(tarefaId) {
    const index = tarefas.findIndex(t => t.id === tarefaId);
    if (index === -1) {
        return null;
    }
    const [tarefaRemovida] = tarefas.splice(index, 1);
    return tarefaRemovida;
}

module.exports = { listar, criar, buscarPeloId, atualizar, remover };