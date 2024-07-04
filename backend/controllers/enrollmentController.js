const {
    createEnrollment,
    getEnrollmentsByUserId,
    getEnrollmentsByCourseId,
    updateEnrollment,
    deleteEnrollment,
  } = require('../models/enrollmentModel');
  
  // Controller to handle creating a new enrollment
  const createEnrollmentHandler = async (req, res) => {
    const { user_id, course_id, enrollment_status } = req.body;
  
    try {
      const enrollment = await createEnrollment(user_id, course_id, enrollment_status);
      res.status(201).json(enrollment);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Controller to handle getting enrollments by user ID
  const getEnrollmentsByUserIdHandler = async (req, res) => {
    const { user_id } = req.params;
  
    try {
      const enrollments = await getEnrollmentsByUserId(user_id);
      res.status(200).json(enrollments);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Controller to handle getting enrollments by course ID
  const getEnrollmentsByCourseIdHandler = async (req, res) => {
    const { course_id } = req.params;
  
    try {
      const enrollments = await getEnrollmentsByCourseId(course_id);
      res.status(200).json(enrollments);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Controller to handle updating an enrollment
  const updateEnrollmentHandler = async (req, res) => {
    const { enrollment_id, enrollment_status } = req.body;
  
    try {
      const enrollment = await updateEnrollment(enrollment_id, enrollment_status);
      res.status(200).json(enrollment);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Controller to handle deleting an enrollment
  const deleteEnrollmentHandler = async (req, res) => {
    const { enrollment_id } = req.params;
  
    try {
      const enrollment = await deleteEnrollment(enrollment_id);
      res.status(200).json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  module.exports = {
    createEnrollmentHandler,
    getEnrollmentsByUserIdHandler,
    getEnrollmentsByCourseIdHandler,
    updateEnrollmentHandler,
    deleteEnrollmentHandler,
  };
  