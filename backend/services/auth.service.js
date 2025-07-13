const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user.model');

const authService = {
  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) throw new Error('Usuário não encontrado');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error('Senha inválida');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    const userSafe = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage
    };

    return { token, user: userSafe };
  },

  async register(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return await User.create(user);
  }
};

module.exports = authService;
