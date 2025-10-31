require('dotenv').config();
var supertest = require('supertest');
var app = require('../app');
var request = supertest(app);

var token;
var novoToken;

describe('API praticas/pratica08', function() {

  
    it('deve retornar 401 - Não autorizado (GET /produtos)', function(done) {
        request.get('/produtos')
            .expect(401)
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (res.body.msg !== 'Não autorizado') {
                    throw new Error('Mensagem errada: ' + res.body.msg);
                }
            })
            .end(done);
    });

 
    it('deve retornar 401 - Token inválido (GET /produtos)', function(done) {
        request.get('/produtos')
            .set('authorization', '123456789')
            .expect(401)
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (res.body.msg !== 'Token inválido') {
                    throw new Error('Mensagem errada: ' + res.body.msg);
                }
            })
            .end(done);
    });

 
    it('deve retornar 200 e um token (POST /usuarios/login)', function(done) {
        request.post('/usuarios/login')
            .send({
                usuario: "email@exemplo.com",
                senha: "abcd1234"
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (!res.body.token) {
                    throw new Error('Não retornou um token');
                }
             
                token = res.body.token;
            })
            .end(done);
    });


    it('deve retornar 200 e um JSON (GET /produtos)', function(done) {
        request.get('/produtos')
            .set('authorization', token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });

  
    it('deve retornar 200 e um novo token (POST /usuarios/renovar)', function(done) {
        request.post('/usuarios/renovar')
            .set('authorization', token)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (!res.body.token) {
                    throw new Error('Não retornou um novo token');
                }
               
                novoToken = res.body.token;
            })
            .end(done);
    });

  
    it('deve retornar 200 e um JSON (GET /produtos com novo token)', function(done) {
        request.get('/produtos')
            .set('authorization', novoToken)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });

});