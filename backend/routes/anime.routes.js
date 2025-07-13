const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/top', async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/top/anime');
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar animes:', error);
    res.status(500).json({ error: 'Erro ao buscar animes' });
  }
});

module.exports = router;
