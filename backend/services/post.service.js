const express = require('express');
const connectDB = require('./config/db.config');
const postRoutes = require('./routes/post.routes');
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const app = express();

connectDB();


app.post('/posts', authMiddleware, postController.createPost);
app.use(express.json()); 
app.use('/posts', postRoutes); 

app.listen(5000, () => {
    console.log('🚀 Servidor rodando na porta 5000')
});