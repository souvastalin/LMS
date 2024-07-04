const pool = require('../config/db'); // Ensure this path is correct
const bcrypt = require('bcryptjs');

// Function to create a new user
const createUser = async (username, password, role_id) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (username, password, role_id) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, role_id]
    );
    return newUser.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to get a user by username
const getUserByUsername = async (username) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return user.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to get a user by ID
const getUserById = async (user_id) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
    return user.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to get all users
const getAllUsers = async () => {
  try {
    const users = await pool.query('SELECT * FROM users');
    return users.rows;
  } catch (error) {
    throw error;
  }
};

// Function to update a user
const updateUser = async (user_id, username, password, role_id) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await pool.query(
      'UPDATE users SET username = $1, password = $2, role_id = $3 WHERE user_id = $4 RETURNING *',
      [username, hashedPassword, role_id, user_id]
    );
    return updatedUser.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to delete a user
const deleteUser = async (user_id) => {
  try {
    const deletedUser = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [user_id]);
    return deletedUser.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
};
