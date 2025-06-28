const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  forumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Forum', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  body: String,
  replies: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Topic', topicSchema);