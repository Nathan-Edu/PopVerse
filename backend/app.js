const express = require('express');
const { connectDB } = require('./config/db.config');

const app = express();
connectDB();
app.use(express.json());

// Rotas
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes'); 
const reviewRoutes = require('./routes/review.routes');
const forumRoutes = require('./routes/forum.routes');

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/reviews', reviewRoutes);
app.use('/', forumRoutes);
app.use('/uploads', express.static('uploads'));

module.exports = app;