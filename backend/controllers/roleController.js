const { createRole, getAllRoles, getRoleById, updateRole, deleteRole } = require('../models/roleModel');

// Create a new role
const createRoleHandler = async (req, res) => {
  const { role_name } = req.body;

  try {
    const newRole = await createRole(role_name);
    res.status(201).json(newRole);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all roles
const getAllRolesHandler = async (req, res) => {
  try {
    const roles = await getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single role by ID
const getRoleByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await getRoleById(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.status(200).json(role);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a role
const updateRoleHandler = async (req, res) => {
  const { id } = req.params;
  const { role_name } = req.body;

  try {
    const updatedRole = await updateRole(id, role_name);
    if (!updatedRole) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.status(200).json(updatedRole);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a role
const deleteRoleHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRole = await deleteRole(id);
    if (!deletedRole) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createRoleHandler,
  getAllRolesHandler,
  getRoleByIdHandler,
  updateRoleHandler,
  deleteRoleHandler
};
