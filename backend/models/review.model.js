const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Usuário que fez a avaliação
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID do item avaliado (filme, série, etc.)
    rating: { type: Number, min: 1, max: 5, required: true }, // Nota da avaliação (1 a 5 estrelas)
    comment: { type: String } // Comentário opcional sobre a obra
}, { timestamps: true }); // Adiciona data de criação e atualização

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;