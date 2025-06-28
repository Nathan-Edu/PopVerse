// backend/config/db.config.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Banco de dados conectado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error);
    process.exit(1);
  }
};

// Usando um nome único e consistente para o token, por exemplo, JWT_SECRET
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // Certifique-se de que essa variável esteja definida no .env
const jwtConfig = {
  secretKey,
  expiresIn: '1h',
};

module.exports = { connectDB, jwtConfig };