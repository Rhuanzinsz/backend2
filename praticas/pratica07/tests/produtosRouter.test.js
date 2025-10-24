const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('API de Produtos (/produtos)', () => {

  let id; // Variável para salvar o ID do produto criado

  // Teste POST /produtos
  it('Deve retornar 201 e um JSON ao criar um produto com POST /produtos', async () => {
    const response = await request.post('/produtos').send({ nome: "Laranja", preco: 10.0 });
    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('nome', 'Laranja');
    expect(response.body).toHaveProperty('preco', 10.0);
    id = response.body._id;
  });

  // Teste POST /produtos (erro de validação)
  it('Deve retornar 422 e um JSON ao tentar criar um produto sem dados com POST /produtos', async () => {
    const response = await request.post('/produtos').send({});
    expect(response.status).toBe(422);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  // Teste GET /produtos
  it('Deve retornar 200 e um array JSON com GET /produtos', async () => {
    const response = await request.get('/produtos');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Teste GET /produtos/:id
  it('Deve retornar 200 e um objeto JSON com GET /produtos/${id}', async () => {
    const response = await request.get(`/produtos/${id}`);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id', id);
    expect(response.body).toHaveProperty('nome', 'Laranja');
    expect(response.body).toHaveProperty('preco', 10.0);
  });

  // Teste GET /produtos/:id (ID inválido)
  it('Deve retornar 400 ao buscar com ID inválido (GET /produtos/0)', async () => {
    const response = await request.get('/produtos/0');
    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  // Teste GET /produtos/:id (Não encontrado)
  it('Deve retornar 404 ao buscar com ID inexistente (GET /produtos/000000000000000000000000)', async () => {
    const response = await request.get('/produtos/000000000000000000000000'); 
    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  // Teste PUT /produtos/:id
  it('Deve retornar 200 e um JSON ao atualizar um produto com PUT /produtos/${id}', async () => {
    const response = await request.put(`/produtos/${id}`).send({ nome: "Laranja Pera", preco: 18.00 });
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id', id);
    expect(response.body).toHaveProperty('nome', 'Laranja Pera');
    expect(response.body).toHaveProperty('preco', 18.00);
  });

  // Teste PUT /produtos/:id (erro de validação)
  it('Deve retornar 422 ao tentar atualizar sem dados com PUT /produtos/${id}', async () => {
    const response = await request.put(`/produtos/${id}`).send({});
    expect(response.status).toBe(422);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  // Teste PUT /produtos/:id (ID inválido)
  it('Deve retornar 400 ao atualizar com ID inválido (PUT /produtos/0)', async () => {
    const response = await request.put('/produtos/0').send({ nome: "Invalido", preco: 1 });
    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  // Teste PUT /produtos/:id (Não encontrado)
  it('Deve retornar 404 ao atualizar com ID inexistente (PUT /produtos/000000000000000000000000)', async () => {
    const response = await request.put('/produtos/000000000000000000000000').send({ nome: "Inexistente", preco: 1 });
    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  // Teste DELETE /produtos/:id
  it('Deve retornar 204 ao remover um produto com DELETE /produtos/${id}', async () => {
    const response = await request.delete(`/produtos/${id}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  // Teste DELETE /produtos/:id (ID inválido)
  it('Deve retornar 400 ao remover com ID inválido (DELETE /produtos/0)', async () => {
    const response = await request.delete('/produtos/0');
    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });
  
  // Teste DELETE /produtos/:id (Não encontrado)
  it('Deve retornar 404 ao remover com ID inexistente (DELETE /produtos/${id})', async () => {
    const response = await request.delete(`/produtos/000000000000000000000000`);
    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

});