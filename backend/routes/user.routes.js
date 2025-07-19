const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); 

// Rotas
router.post('/register', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserProfile);
router.delete('/:id', userController.deleteUser);
router.post('/:id/avatar', userController.uploadAvatar);
router.put('/:id/bio', userController.updateBio); 

module.exports = router;
