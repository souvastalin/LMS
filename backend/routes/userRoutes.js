const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { authenticateToken, isAdmin } = require('.middlewares/roleMiddleware');
const {
  registerUser,
  loginUser,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler
} = require('..userController.js');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Apply authentication middleware to all protected routes
router.use(authenticateToken);

// Protected routes
router.get('/users', isAdmin, getAllUsersHandler);
router.get('/users/:id', isAdmin, getUserByIdHandler);
router.put('/users/:id', isAdmin, updateUserHandler);
router.delete('/users/:id', isAdmin, deleteUserHandler);

module.exports = router;
