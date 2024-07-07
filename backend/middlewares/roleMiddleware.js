
const jwt = require('jsonwebtoken');

// Middleware to verify JWT and attach user to request object
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role_id !== 1) {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

// Middleware to check if the user is a teacher
const isTeacher = (req, res, next) => {
  if (req.user.role_id !== 2) {
    return res.status(403).json({ error: 'Access denied. Teachers only.' });
  }
  next();
};

// Middleware to check if the user is a student
const isStudent = (req, res, next) => {
  if (req.user.role_id !== 3) {
    return res.status(403).json({ error: 'Access denied. Students only.' });
  }
  next();
};

module.exports = {
  authenticateToken,
  isAdmin,
  isTeacher,
  isStudent
};
