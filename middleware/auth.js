const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Clé secrète JWT 
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    // Récupérer le token depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'Aucun token fourni. Authentification requise.'
      });
    }

    // Le format attendu est : "Bearer TOKEN"
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Token invalide. Authentification requise.'
      });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Vérifier que l'utilisateur existe toujours
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Utilisateur non trouvé. Token invalide.'
      });
    }

    // Ajouter l'utilisateur à la requête
    req.user = { id: user.id, username: user.username, email: user.email };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Token invalide'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expiré. Veuillez vous reconnecter.'
      });
    }

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = authMiddleware;
