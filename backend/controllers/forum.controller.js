const Forum = require('../models/forum.model');
const Topic = require('../models/topic.model');

// GET /forums
exports.getAllForums = async (req, res) => {
  try {
    const forums = await Forum.find();
    res.status(200).json(forums);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar fóruns' });
  }
};

// POST /forums
exports.createForum = async (req, res) => {
  try {
    const forum = new Forum(req.body);
    await forum.save();
    res.status(201).json(forum);
  } catch {
    res.status(500).json({ error: 'Erro ao criar fórum' });
  }
};

// GET /forums/:id/topics
exports.getTopicsByForum = async (req, res) => {
  try {
    const topics = await Topic.find({ forumId: req.params.id }).populate('user', 'name profileImage');
    res.status(200).json(topics);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar tópicos' });
  }
};

// POST /topics/:id/reply
exports.replyToTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ error: 'Tópico não encontrado' });

    topic.replies.push({
      user: req.user.id,
      text: req.body.text,
      createdAt: new Date()
    });

    await topic.save();
    res.status(201).json(topic.replies);
  } catch {
    res.status(500).json({ error: 'Erro ao responder tópico' });
  }
};