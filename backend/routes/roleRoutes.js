const express = require('express');
const { createRoleHandler, getAllRolesHandler, getRoleByIdHandler, updateRoleHandler, deleteRoleHandler } = require('../controllers/roleController');
const { authenticateToken, isAdmin } = require('../middlewares/roleMiddleware');
const router = express.Router();

// Apply authentication and admin middleware to all routes in this router
router.use(authenticateToken);
router.use(isAdmin);

// Create a new role
router.post('/roles', createRoleHandler);

// Get all roles
router.get('/roles', getAllRolesHandler);

// Get a single role by ID
router.get('/roles/:id', getRoleByIdHandler);

// Update a role
router.put('/roles/:id', updateRoleHandler);

// Delete a role
router.delete('/roles/:id', deleteRoleHandler);

module.exports = router;
