const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const jwtConfig = {
  secretKey,
  expiresIn: '1h',
};

module.exports = jwtConfig;