const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user.model');

const authService = {
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Senha inválida');
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });

    return token;
  },

  async register(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    return await User.create(user);
  }
};

module.exports = authService;