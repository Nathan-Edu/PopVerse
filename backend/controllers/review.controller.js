const Review = require('../models/review.model');

// Criar avaliação
exports.createReview = async (req, res) => {
  try {
    const { contentId, rating, comment } = req.body;
    const userId = req.user?.id;

    if (!userId || !contentId || !rating) {
      return res.status(400).json({ error: 'Dados inválidos.' });
    }

    // Verifica se o mesmo usuário já avaliou essa mídia
    const existing = await Review.findOne({ contentId, user: userId });
    if (existing) {
      return res.status(400).json({ error: 'Você já avaliou esta mídia.' });
    }

    const newReview = new Review({
      contentId,
      rating,
      comment,
      user: userId
    });

    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Erro ao criar review:", error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
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

    res.status(200).json({
      average: avg,
      total: reviews.length,
      reviews
    });
  } catch (error) {
    console.error('Erro ao buscar reviews:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações.' });
  }
};
