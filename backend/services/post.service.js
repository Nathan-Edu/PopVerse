const express = require('express');
const connectDB = require('./config/db.config');
const postRoutes = require('./routes/post.routes');

const app = express();
connectDB();

app.use(express.json()); // Middleware para interpretar JSON
app.use('/posts', postRoutes); // Rotas de publicações

app.listen(5008, () => {
    console.log('🚀 Servidor rodando na porta 5008')
});