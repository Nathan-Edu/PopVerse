const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Título da publicação
    content: { type: String, required: true }, // Conteúdo do post
    category: { type: String, enum: ['Filmes', 'Séries', 'Animes', 'HQs', 'Games'], required: true }, // Categoria
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Autor do post
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Lista de usuários que curtiram
    comments: [{ 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Autor do comentário
        text: { type: String }, // Texto do comentário
        timestamp: { type: Date, default: Date.now } // Data do comentário
    }]
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;