const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Conectar ao banco de dados MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Banco de dados conectado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error);
    process.exit(1); // Encerra o processo caso não consiga conectar
  }
};

// Configurações do JWT
const jwtConfig = {
  secretKey: process.env.JWT_SECRET || 'suachavesecreta', // Valor padrão caso não esteja no .env
  expiresIn: '2h', // Tempo de expiração do token JWT
};

module.exports = { connectDB, jwtConfig };
