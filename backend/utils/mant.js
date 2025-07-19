const dotenv = require('dotenv');
dotenv.config();  // Carrega variáveis de ambiente

const config = {
  // Banco de Dados
  db: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/PopVerse',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // JWT Secret para autenticação
  jwt: {
    secret: process.env.JWT_SECRET || 'suachavesecreta',
    expiresIn: '2h',
  },

  // Configurações de E-mail (para recuperação de senha e outros)
  email: {
    service: 'gmail', // Ou o serviço que você estiver utilizando
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_USER,
  },

  // Configurações de porta para o servidor
  server: {
    port: process.env.PORT || 5000,
  },

  // Outras configurações que você pode adicionar futuramente
  upload: {
    path: 'uploads/avatars/',  // Local para os uploads (ex: avatares de usuário)
    maxSize: 5 * 1024 * 1024,  // Limite de tamanho do arquivo (5MB)
  },

  // Configuração do frontend (se necessário para integração)
  frontend: {
    baseUrl: process.env.FRONTEND_URL || 'http://localhost:4200',
  },
};

module.exports = config;
