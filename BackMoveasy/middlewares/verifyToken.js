const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ message: 'Token manquant. Vous devez être connecté pour accéder à cette ressource.' });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token expiré ou invalide. Veuillez vous reconnecter.' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
