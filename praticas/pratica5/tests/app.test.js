const request = require('supertest');
const app = require('../app');

describe('API de Tarefas - Testes de Integração', () => {
    let taskId;

    test('Deve listar tarefas com status 200 e tipo JSON', async () => {
        const res = await request(app).get('/tarefas');
        expect(res.statusCode).toEqual(200);
        expect(res.headers['content-type']).toMatch(/json/);
    });

    test('Deve criar uma tarefa com status 201 e tipo JSON', async () => {
        const res = await request(app)
            .post('/tarefas')
            .send({ nome: "Estudar Node", concluida: false });
        expect(res.statusCode).toEqual(201);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body.id).toBeDefined();
        taskId = res.body.id;
    });

    test('Deve buscar uma tarefa específica pelo id com status 200', async () => {
        const res = await request(app).get(`/tarefas/${taskId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.headers['content-type']).toMatch(/json/);
    });

    test('Deve retornar 404 ao buscar uma tarefa com id inexistente (GET)', async () => {
        const res = await request(app).get('/tarefas/1');
        expect(res.statusCode).toEqual(404);
        expect(res.headers['content-type']).toMatch(/json/);
    });

    test('Deve atualizar uma tarefa com status 200', async () => {
        const res = await request(app)
            .put(`/tarefas/${taskId}`)
            .send({ nome: "Estudar Node e Express", concluida: true });
        expect(res.statusCode).toEqual(200);
        expect(res.headers['content-type']).toMatch(/json/);
    });

    test('Deve retornar 404 ao atualizar uma tarefa com id inexistente (PUT)', async () => {
        const res = await request(app).put('/tarefas/1');
        expect(res.statusCode).toEqual(404);
        expect(res.headers['content-type']).toMatch(/json/);
    });

    test('Deve remover uma tarefa com status 204', async () => {
        const res = await request(app).delete(`/tarefas/${taskId}`);
        expect(res.statusCode).toEqual(204);
    });

    test('Deve retornar 404 ao remover uma tarefa com id inexistente (DELETE)', async () => {
        const res = await request(app).delete('/tarefas/1');
        expect(res.statusCode).toEqual(404);
        expect(res.headers['content-type']).toMatch(/json/);
    });
});