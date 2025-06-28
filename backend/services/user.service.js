const mongoose = require('mongoose');
const User = require('./models/user.model');

const userService = {
  async getAllUsers() {
    return await User.find().exec();
  },

  async getUserById(id) {
    return await User.findById(id).exec();
  },

  async createUser(user) {
    return await User.create(user);
  },

  async updateUser(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  },

  async deleteUser(id) {
    return await User.findByIdAndRemove(id);
  }
};

module.exports = userService;