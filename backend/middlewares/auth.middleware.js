const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para verificar o token JWT
const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization'); // Obtém o token do cabeçalho

        if (!token) {
            return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
        }

        // Verifica o token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // Adiciona os dados do usuário autenticado à requisição

        next(); // Passa para a próxima etapa da requisição
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
};

module.exports = authMiddleware;