const request = require('supertest');
const app = require('../app'); // Importa a aplicação
const mongoose = require('mongoose');
const User = require('../models/user.model');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI); // Conecta ao banco de teste
});

afterAll(async () => {
    await mongoose.connection.close(); // Fecha conexão após testes
});

describe('Testes de Autenticação', () => {
    it('Deve registrar um usuário', async () => {
        const res = await request(app).post('/auth/register').send({
            name: 'Teste User',
            email: 'teste@example.com',
            password: 'senha123',
            interests: ['Marvel', 'DC']
        });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Usuário registrado com sucesso!');
    });

    it('Deve fazer login com usuário válido', async () => {
        const res = await request(app).post('/auth/login').send({
            email: 'teste@example.com',
            password: 'senha123'
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token'); // Token deve ser retornado
    });

    it('Deve falhar ao fazer login com senha errada', async () => {
        const res = await request(app).post('/auth/login').send({
            email: 'teste@example.com',
            password: 'senhaErrada'
        });

        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Usuário ou senha inválidos');
    });

    it('Deve verificar recuperação de senha', async () => {
        const res = await request(app).post('/auth/forgot-password').send({
            email: 'teste@example.com'
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Um e-mail de recuperação foi enviado!');
    });
});