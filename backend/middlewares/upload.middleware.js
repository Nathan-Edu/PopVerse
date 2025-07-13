const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/avatars/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const isValid = allowed.test(path.extname(file.originalname).toLowerCase());
  cb(null, isValid);

const uploadMiddleware = require('../middlewares/upload.middleware');
const userController = require('../controllers/user.controller');

  // Rota para upload de avatar
  app.post('/users/:id/avatar', authMiddleware, uploadMiddleware.single('avatar'), userController.uploadAvatar);

};

module.exports = multer({ storage, fileFilter });