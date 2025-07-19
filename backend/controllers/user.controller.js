const User = require('../models/user.model');


 // Listar todos os usuários
 
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};


 // Obter um usuário pelo ID
 
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};


 //  Atualizar perfil do usuário
 
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(200).json({ message: "Perfil atualizado com sucesso!", user });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    res.status(500).json({ error: "Erro ao atualizar perfil" });
  }
};


 // Deletar usuário
 
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};


 // Atualizar avatar
 
exports.uploadAvatar = async (req, res) => {
  res.status(200).json({ message: 'Avatar atualizado (simulado)' });
};

exports.updateBio = async (req, res) => {
  res.status(200).json({ message: 'Bio atualizada (simulado)' });
};



 // Criar um novo usuário
 
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "Usuário criado com sucesso!", user });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

