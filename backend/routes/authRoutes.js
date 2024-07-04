const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db.js'); // Ensure this path is correct

// Register a new user
const router = express.Router();
router.post('/register', async (req, res) => {
  const { user_name, email, password, role_id } = req.body;

  try {
    // Check if user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));

    // Insert new user into database
    const newUser = await pool.query(
      'INSERT INTO users (user_name, email, password, role_id, user_status, signed_up_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_name, email, hashedPassword, role_id, 'active', new Date()]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create and send JWT
    const token = jwt.sign({ user_id: user.rows[0].user_id, role_id: user.rows[0].role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

// authController
//const express = require('express');
const { register, login } = require('../controllers/authcontroller');


// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

module.exports = router;