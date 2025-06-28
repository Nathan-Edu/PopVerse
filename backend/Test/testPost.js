const mongoose = require('mongoose');
const Post = require('./models/post.model');
const connectDB = require('./config/db.config');

connectDB();

const createTestPost = async () => {
    try {
        const post = new Post({
            title: 'Novo Filme da Marvel',
            content: 'O trailer do novo filme da Marvel foi incrível!',
            category: 'Filmes',
            user: '2' // Substituir pelo _id do usuário criado
        });

        await post.save();
        console.log('✅ Publicação criada com sucesso!');
        mongoose.connection.close();
    } catch (error) {
        console.error('❌ Erro ao criar publicação:', error);
    }
};

createTestPost();