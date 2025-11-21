var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

var app = express();

app.use(logger('dev'));


app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



var usuariosRouter = require('./routes/usuariosRouter');
var apidocsRouter = require('./routes/apidocsRouter');

app.use('/usuarios', usuariosRouter);
app.use('/api-docs', apidocsRouter);

module.exports = app;