const express = require('express');
const {
  createEnrollmentHandler,
  getEnrollmentsByUserIdHandler,
  getEnrollmentsByCourseIdHandler,
  updateEnrollmentHandler,
  deleteEnrollmentHandler,
} = require('../controllers/enrollmentController');
const { authenticateToken, isAdmin, isTeacher } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/enrollments', authenticateToken, createEnrollmentHandler);
router.get('/enrollments/user/:user_id', authenticateToken, getEnrollmentsByUserIdHandler);
router.get('/enrollments/course/:course_id', authenticateToken, getEnrollmentsByCourseIdHandler);
router.put('/enrollments', authenticateToken, isTeacher, updateEnrollmentHandler);
router.delete('/enrollments/:enrollment_id', authenticateToken, isAdmin, deleteEnrollmentHandler);

module.exports = router;
