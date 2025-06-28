const mongoose = require('mongoose');
const User = require('./models/user.model');
const connectDB = require('./config/db.config');

connectDB();

const createTestUser = async () => {
    try {
        const user = new User({
            name: 'Nathan',
            email: 'nathan@example.com',
            password: 'senha123',
            interests: ['Marvel', 'DC']
        });

        await user.save();
        console.log('✅ Usuário criado com sucesso!');
        mongoose.connection.close(); // Fecha a conexão após a inserção
    } catch (error) {
        console.error('❌ Erro ao criar usuário:', error);
    }
};

createTestUser();