const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'suachavesecreta';

// 🔐 Registro de usuário
const registerUser = async (req, res) => {
  try {
    const { name, email, password, username, interests } = req.body;

    if (!name || !email || !password || !username) {
      return res.status(400).json({ error: 'Nome, email, senha e username são obrigatórios.' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail ou username já cadastrados.' });
    }

    // ❗️ Removido o hash manual da senha – o model já faz isso
    const newUser = new User({ name, email, username, password, interests });
    await newUser.save();

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      user: {
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        interests: newUser.interests
      }
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

// 🔐 Login do usuário
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Usuário ou senha inválidos' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Usuário ou senha inválidos' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        username: user.username,
        interests: user.interests
      }
    });
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    res.status(500).json({ error: 'Erro ao autenticar usuário' });
  }
};

// Endpoints futuros
const forgotPassword = async (req, res) => {
  res.status(200).json({ message: 'Endpoint de recuperação de senha ainda não implementado.' });
};

const resetPassword = async (req, res) => {
  res.status(200).json({ message: 'Endpoint de restabelecimento de senha ainda não implementado.' });
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
};
