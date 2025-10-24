const mongoose = require('mongoose'); //
const Produto = require('../models/produtosModel.js'); //

// Função para CRIAR um produto
async function criar(req, res) { //
  try {
    const novoProduto = await Produto.create(req.body); //
    res.status(201).json(novoProduto); //
  } catch (error) {
    //
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

// Função para LISTAR todos os produtos
async function listar(req, res) { //
  const produtosCadastrados = await Produto.find({}); //
  res.status(200).json(produtosCadastrados); //
}

// Função middleware para BUSCAR um produto por ID
async function buscar(req, res, next) { //
  // Valida se o ID é um ObjectId válido do MongoDB
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) { //
    return res.status(400).json({ msg: "Parâmetro inválido" }); //
  }
  
  try {
    const produtoEncontrado = await Produto.findOne({ _id: req.params.id }); //
    
    if (!produtoEncontrado) { //
      return res.status(404).json({ msg: "Produto não encontrado" });
    }
    
    req.produto = produtoEncontrado; //
    next(); //
  } catch (error) {
    res.status(500).json({ msg: "Erro interno no servidor" });
  }
}

// Função para EXIBIR um produto (que foi buscado antes)
function exibir(req, res) { //
  res.status(200).json(req.produto); //
}

// Função para ATUALIZAR um produto
async function atualizar(req, res) { //
  try {
    const produtoAtualizado = await Produto.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      // runValidators: true garante que o 'required' do Schema seja checado na atualização
      { runValidators: true, new: true } //
    );
    res.status(200).json(produtoAtualizado); //
  } catch (error) {
    //
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

// Função para REMOVER um produto
async function remover(req, res) { //
  try {
    await Produto.findOneAndDelete({ _id: req.params.id }); //
    res.status(204).end(); // .end() é usado pois 204 não deve ter corpo
  } catch (error) {
    res.status(500).json({ msg: "Erro ao remover produto" });
  }
}

// Exporta todas as funções
module.exports = { //
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover
};