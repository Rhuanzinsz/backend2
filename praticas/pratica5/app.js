var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var tarefaRouter = require('./routes/tarefaRouter'); // Importa a rota

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/tarefas', tarefaRouter); // Usa a rota na URL /tarefas

module.exports = app;