const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    name: user.name
  };
  return jwt.sign(
    payload,
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
};

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // pega do cookie
  if (!token) {
    return res.redirect("/login");
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.redirect("/login");
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  generateToken,
  authMiddleware
}