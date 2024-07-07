const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticate, authorize } = require('../middlewares/authMiddleware.js');
const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require('../controllers/courseController.js');
const { authenticateToken, isTeacher, isAdmin } = require('../middlewares/roleMiddleware.js');

//const { authenticate, authorize } = require('../lms/backend/middlewares/authMiddleware.js');
//const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require('../lms/backend/controllers/courseController.js');
//const { authenticateToken, isTeacher, isAdmin } = require('../lms/backend/middlewares/roleMiddleware.js');

router.post('/courses', authenticate, authorize([1]), async (req, res) => { // role_id 1 is for teachers
  try {
    const newCourse = await pool.query(
      `INSERT INTO Courses (course_name, course_description, user_id, course_status, course_updated_at)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.body.course_name, req.body.course_description, req.user.user_id, req.body.course_status, req.body.course_updated_at]
    );
    res.status(201).json(newCourse.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/courses', authenticate, async (req, res) => {
  try {
    const courses = await pool.query('SELECT * FROM Courses');
    res.status(200).json(courses.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// courseController
//const express = require('express');

//const router = express.Router();

// Create a new course
router.post('/courses', createCourse);

// Get all courses
router.get('/courses', getAllCourses);

// Get a single course by ID
router.get('/courses/:id', getCourseById);

// Update a course
router.put('/courses/:id', updateCourse);

// Delete a course
router.delete('/courses/:id', deleteCourse);

module.exports = router;


//roleMiddleware

//const express = require('express');

//const router = express.Router();

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Create a new course (teacher only)
router.post('/courses', isTeacher, createCourse);

// Get all courses (accessible to all authenticated users)
router.get('/courses', getAllCourses);

// Get a single course by ID (accessible to all authenticated users)
router.get('/courses/:id', getCourseById);

// Update a course (teacher only)
router.put('/courses/:id', isTeacher, updateCourse);

// Delete a course (admin only)
router.delete('/courses/:id', isAdmin, deleteCourse);

module.exports = router;

