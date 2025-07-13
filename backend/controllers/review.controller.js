const Review = require('../models/review.model');

// Criar ou atualizar avaliação
exports.createOrUpdateReview = async (req, res) => {
  try {
    const { contentId, rating, comment } = req.body;
    const userId = req.user?.id;

    if (!userId || !contentId) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const existing = await Review.findOne({ contentId, user: userId });

    if (existing) {
      existing.rating = rating;
      existing.comment = comment;
      await existing.save();
      return res.status(200).json(existing); // atualizado
    }

    const newReview = new Review({ contentId, rating, comment, user: userId });
    await newReview.save();
    return res.status(201).json(newReview); // criado novo
  } catch (error) {
    console.error("Erro ao criar/atualizar review:", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Deletar review
exports.deleteReview = async (req, res) => {
  try {
    const { contentId } = req.params;
    const userId = req.user?.id;

    const result = await Review.findOneAndDelete({ contentId, user: userId });

    if (!result) {
      return res.status(404).json({ error: 'Avaliação não encontrada.' });
    }

    res.status(200).json({ message: 'Avaliação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar avaliação' });
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
