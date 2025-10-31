var jwt = require('jsonwebtoken');

function gerarToken(payload) {
   
    var expiresIn = 120; 

    try {
       
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: expiresIn
        });
    } catch (err) {
        
        throw new Error('Erro ao gerar o token');
    }
}

function verificarToken(req, res, next) {
   
    var token = req.headers['authorization'];

  
    if (!token) {
        return res.status(401).json({ msg: 'Não autorizado' });
    }

    try {
      
        var decoded = jwt.verify(token, process.env.JWT_SECRET);

     
        req.usuario = decoded;

     
        return next();
        
    } catch (err) {
       
        return res.status(401).json({ msg: 'Token inválido' });
    }
}


module.exports = {
    gerarToken: gerarToken,
    verificarToken: verificarToken
};