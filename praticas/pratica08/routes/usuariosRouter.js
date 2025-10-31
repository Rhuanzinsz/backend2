var express = require('express');
var authMiddleware = require('../middlewares/authMiddleware');
var router = express.Router();


router.post('/login', function(req, res) {
    try {
 
        var payload = { email: req.body.usuario }; 
        var token = authMiddleware.gerarToken(payload);


        res.status(200).json({ token: token });

    } catch (err) {
        res.status(500).json({ msg: 'Erro ao gerar o token' });
    }
});


router.post('/renovar', authMiddleware.verificarToken, function(req, res) {
    try {
    
        var payload = { email: req.usuario.email }; 
        var token = authMiddleware.gerarToken(payload);

       
        res.status(200).json({ token: token });

    } catch (err) {
        res.status(500).json({ msg: 'Erro ao gerar o token' });
    }
});


module.exports = router;