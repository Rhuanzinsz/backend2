const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('API Usuarios', () => {
    
    
    afterAll(async () => {
        await mongoose.connection.close();
    });

    let id;
    let token;

    const emailTeste = `teste${Date.now()}@email.com`; 

    test('POST /usuarios (201)', async () => {
        const res = await request(app)
            .post('/usuarios')
            .send({ email: emailTeste, senha: "123" });
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('_id');
        id = res.body._id; 
    });

    test('POST /usuarios sem dados (422)', async () => {
        const res = await request(app).post('/usuarios');
        expect(res.status).toBe(422);
    });

    test('POST /usuarios/login (200)', async () => {
        const res = await request(app)
            .post('/usuarios/login')
            .send({ usuario: emailTeste, senha: "123" });
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; 
    });

    test('POST /usuarios/renovar (200)', async () => {
        const res = await request(app)
            .post('/usuarios/renovar')
            .set('authorization', token);
        
        expect(res.status).toBe(200);
    });

    test('DELETE /usuarios/:id (204)', async () => {
        const res = await request(app)
            .delete(`/usuarios/${id}`)
            .set('authorization', token);
        
        expect(res.status).toBe(204);
    });
});