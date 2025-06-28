const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);
router.post('/:id/like', authMiddleware, postController.toggleLike);
router.post('/:id/comment', authMiddleware, postController.addComment);

module.exports = router;    