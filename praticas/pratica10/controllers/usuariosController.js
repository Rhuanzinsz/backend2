const usuariosModel = require('../models/usuariosModel');
const auth = require('../middlewares/authMiddleware');

async function criar(req, res) {
    try {
        const senhaCifrada = auth.cifrarSenha(req.body.senha);
        const novoUsuario = await usuariosModel.create({ 
            email: req.body.email, 
            senha: senhaCifrada 
        });
        res.status(201).json({ _id: novoUsuario._id, email: novoUsuario.email });
    } catch (error) {
        res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }
}

async function entrar(req, res) {
    const usuarioEncontrado = await usuariosModel.findOne({ email: req.body.usuario });
    
    if (usuarioEncontrado && auth.compararSenha(req.body.senha, usuarioEncontrado.senha)) {
        const token = auth.gerarToken({ email: req.body.usuario });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ msg: "Credenciais inválidas" });
    }
}

async function renovar(req, res) {
    const token = auth.gerarToken({ email: req.usuario.email });
    res.status(200).json({ token });
}

async function remover(req, res) {
    await usuariosModel.findOneAndDelete({ _id: req.params.id });
    res.status(204).end();
}

module.exports = { criar, entrar, renovar, remover };