var express = require('express');
var authMiddleware = require('../middlewares/authMiddleware');
var router = express.Router();


router.get('/', authMiddleware.verificarToken, function(req, res) {
    res.status(200).json([]); 
});


module.exports = router;