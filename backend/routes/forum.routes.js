const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forum.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/forums', forumController.getAllForums);
router.post('/forums', auth, forumController.createForum);
router.get('/forums/:id/topics', forumController.getTopicsByForum);
router.post('/topics/:id/reply', auth, forumController.replyToTopic);

module.exports = router;