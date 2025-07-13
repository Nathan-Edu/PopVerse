const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = '8a38356a993e814c9fe0df8e38ec39a77d080327';
const API_URL = `https://comicvine.gamespot.com/api/issues/?format=json&api_key=${API_KEY}`;

// Endpoint intermediário
router.get('/comics', async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'User-Agent': 'PopVerse/1.0'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar HQs:', error.message);
    res.status(500).json({ error: 'Erro ao buscar HQs.' });
  }
});

module.exports = router;
