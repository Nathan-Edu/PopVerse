const Review = require('../models/review.model');

// Criar avaliação
exports.createReview = async (req, res) => {
  try {
    const { contentId, rating, comment } = req.body;
    const user = req.user.id;

    // Opcional: impedir múltiplas avaliações para o mesmo conteúdo
    const existing = await Review.findOne({ contentId, user });
    if (existing) {
      return res.status(400).json({ error: "Você já avaliou este conteúdo." });
    }

    const newReview = await Review.create({ contentId, user, rating, comment });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar avaliação." });
  }
};

// Obter avaliações por conteúdo + média de nota
exports.getReviewsByContent = async (req, res) => {
  try {
    const { contentId } = req.params;
    const reviews = await Review.find({ contentId }).populate('user', 'name profileImage');

    const avg =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : null;

    res.status(200).json({ average: avg, total: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar avaliações." });
  }
};