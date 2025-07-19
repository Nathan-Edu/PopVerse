const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');



//  Cadastro de usuário
router.post('/signup', authController.registerUser);

//  Login
router.post('/login', authController.loginUser);

//  Recuperação de senha
router.post('/forgotPassword', authController.forgotPassword);

// Redefinição de senha
router.post('/resetPassword', authController.resetPassword);

module.exports = router;
