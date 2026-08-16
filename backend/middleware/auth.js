const jwt = require('jsonwebtoken');

const JWT_SECRET = 'my_super_secret_key_for_course_project_2025';

module.exports = (req, res, next) => {

  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid token format. Use Bearer <token>' });
  }

  const token = parts[1];

  try {

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};