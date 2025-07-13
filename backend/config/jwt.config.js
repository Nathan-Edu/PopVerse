const jwt = require('jsonwebtoken');
require('dotenv').config();  // Carrega as variáveis de ambiente do arquivo .env

const jwtConfig = {
  secretKey: process.env.JWT_SECRET || 'suachavesecreta',  // Valor padrão caso não esteja definido no .env
  expiresIn: '2h',  // Tempo de expiração do token JWT
};

module.exports = jwtConfig;
