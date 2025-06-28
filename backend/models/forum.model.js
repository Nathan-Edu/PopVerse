const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Forum', forumSchema);