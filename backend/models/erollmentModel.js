const pool = require('../config/db');

// Function to create a new enrollment
const createEnrollment = async (user_id, course_id, enrollment_status) => {
  try {
    const enrolledDate = new Date();
    const enrollment = await pool.query(
      'INSERT INTO enrollments (user_id, course_id, enrolled_date, enrollment_status) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, course_id, enrolledDate, enrollment_status]
    );
    return enrollment.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to get enrollments by user ID
const getEnrollmentsByUserId = async (user_id) => {
  try {
    const enrollments = await pool.query('SELECT * FROM enrollments WHERE user_id = $1', [user_id]);
    return enrollments.rows;
  } catch (error) {
    throw error;
  }
};

// Function to get enrollments by course ID
const getEnrollmentsByCourseId = async (course_id) => {
  try {
    const enrollments = await pool.query('SELECT * FROM enrollments WHERE course_id = $1', [course_id]);
    return enrollments.rows;
  } catch (error) {
    throw error;
  }
};

// Function to update an enrollment
const updateEnrollment = async (enrollment_id, enrollment_status) => {
  try {
    const updatedDate = new Date();
    const enrollment = await pool.query(
      'UPDATE enrollments SET enrollment_status = $1, enrollment_updated_at = $2 WHERE enrollment_id = $3 RETURNING *',
      [enrollment_status, updatedDate, enrollment_id]
    );
    return enrollment.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to delete an enrollment
const deleteEnrollment = async (enrollment_id) => {
  try {
    const enrollment = await pool.query('DELETE FROM enrollments WHERE enrollment_id = $1 RETURNING *', [enrollment_id]);
    return enrollment.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createEnrollment,
  getEnrollmentsByUserId,
  getEnrollmentsByCourseId,
  updateEnrollment,
  deleteEnrollment,
};
