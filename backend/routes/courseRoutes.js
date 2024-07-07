const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse, getCoursesByTeacher } = require('../controllers/courseController.js');
const { authenticateToken, isTeacher, isAdmin, isTeacherOrAdmin } = require('../middlewares/roleMiddleware.js');

// Create a new course (teacher only)
router.post('/', authenticateToken, isTeacher, createCourse);

// Get all courses (accessible to all authenticated users)
router.get('/', authenticateToken, getAllCourses);

// Get a single course by ID (accessible to all authenticated users)
router.get('/:id', authenticateToken, getCourseById);

// Update a course (teacher only)
router.put('/:id', authenticateToken, isTeacher, updateCourse);

// Delete a course (admin only)
router.delete('/:id', authenticateToken, isAdmin, deleteCourse);

router.get('/teacher/:teacherId', authenticateToken, isTeacherOrAdmin, getCoursesByTeacher);

module.exports = router;
