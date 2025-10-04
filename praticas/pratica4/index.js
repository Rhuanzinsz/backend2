
const express = require('express');


const app = express();

app.use(express.json());

const tarefas = [
    { id: 1, nome: "Estudar middleware", concluida: false }, 
    { id: 2, nome: "Praticar Express", concluida: true } 
];

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} em ${req.originalUrl}`);
    next();
});

const tarefasRouter = express.Router();

tarefasRouter.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

tarefasRouter.post('/tarefas', (req, res) => {
    const novaTarefa = {
        id: tarefas.length + 1,
        nome: req.body.nome,
        concluida: req.body.concluida || false
    };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

tarefasRouter.get('/tarefas/:tarefaId', (req, res, next) => {
    const tarefa = tarefas.find(t => t.id === parseInt(req.params.tarefaId));
    if (!tarefa) {
        return next(new Error('Tarefa não localizada'));
    }
    res.json(tarefa); 
});


tarefasRouter.put('/tarefas/:tarefaId', (req, res, next) => {
    const tarefaId = parseInt(req.params.tarefaId);
    const tarefaIndex = tarefas.findIndex(t => t.id === tarefaId);
    if (tarefaIndex === -1) {
        return next(new Error('Tarefa não localizada'));
    }
    const tarefaAtualizada = {
        id: tarefaId,
        nome: req.body.nome,
        concluida: req.body.concluida
    };
    tarefas[tarefaIndex] = tarefaAtualizada;
    res.json(tarefaAtualizada); 
});

tarefasRouter.delete('/tarefas/:tarefaId', (req, res, next) => {
    const tarefaIndex = tarefas.findIndex(t => t.id === parseInt(req.params.tarefaId));
    if (tarefaIndex === -1) {
        return next(new Error('Tarefa não localizada'));
    }
    tarefas.splice(tarefaIndex, 1);
    res.status(204).send(); 
});


app.use(tarefasRouter);

app.use((err, req, res, next) => {
    res.status(400).json({ error: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;