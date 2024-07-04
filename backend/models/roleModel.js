const pool = require('../config/db'); // Ensure this path is correct

// Function to create a new role
const createRole = async (role_name) => {
  try {
    const newRole = await pool.query(
      'INSERT INTO roles (role_name) VALUES ($1) RETURNING *',
      [role_name]
    );
    return newRole.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to get all roles
const getAllRoles = async () => {
  try {
    const roles = await pool.query('SELECT * FROM roles');
    return roles.rows;
  } catch (error) {
    throw error;
  }
};

// Function to get a role by ID
const getRoleById = async (role_id) => {
  try {
    const role = await pool.query('SELECT * FROM roles WHERE role_id = $1', [role_id]);
    return role.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to update a role
const updateRole = async (role_id, role_name) => {
  try {
    const updatedRole = await pool.query(
      'UPDATE roles SET role_name = $1 WHERE role_id = $2 RETURNING *',
      [role_name, role_id]
    );
    return updatedRole.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to delete a role
const deleteRole = async (role_id) => {
  try {
    const deletedRole = await pool.query('DELETE FROM roles WHERE role_id = $1 RETURNING *', [role_id]);
    return deletedRole.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
};
