const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ msg: "Token invalido" });
    try {
        const tokenLimpo = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Token invalido" });
    }
}

function gerarToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
}

function cifrarSenha(senha) {
    const salto = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(senha, salto);
}

function compararSenha(senha, hash) {
    return bcrypt.compareSync(senha, hash);
}

module.exports = { verificarToken, gerarToken, cifrarSenha, compararSenha };