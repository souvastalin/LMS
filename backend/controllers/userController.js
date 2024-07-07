const { createUser, getUserByUsername, getUserById, getAllUsers, updateUser, deleteUser } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all users
const getAllUsersHandler = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a user by ID
const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a user
const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { username, password, role_id } = req.body;

  try {
    const updatedUser = await updateUser(id, username, password, role_id);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a user
const deleteUserHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { 

  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler
};
