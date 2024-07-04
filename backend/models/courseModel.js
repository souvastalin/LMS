const pool = require('../config/db'); // Ensure this path is correct

// Function to create a new course
const createCourse = async (course_name, description, teacher_id) => {
  try {
    const newCourse = await pool.query(
      'INSERT INTO courses (course_name, description, teacher_id) VALUES ($1, $2, $3) RETURNING *',
      [course_name, description, teacher_id]
    );
    return newCourse.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to get all courses
const getAllCourses = async () => {
  try {
    const courses = await pool.query('SELECT * FROM courses');
    return courses.rows;
  } catch (error) {
    throw error;
  }
};

// Function to get a course by ID
const getCourseById = async (course_id) => {
  try {
    const course = await pool.query('SELECT * FROM courses WHERE course_id = $1', [course_id]);
    return course.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to update a course
const updateCourse = async (course_id, course_name, description) => {
  try {
    const updatedCourse = await pool.query(
      'UPDATE courses SET course_name = $1, description = $2 WHERE course_id = $3 RETURNING *',
      [course_name, description, course_id]
    );
    return updatedCourse.rows[0];
  } catch (error) {
    throw error;
  }
};

// Function to delete a course
const deleteCourse = async (course_id) => {
  try {
    const deletedCourse = await pool.query('DELETE FROM courses WHERE course_id = $1 RETURNING *', [course_id]);
    return deletedCourse.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
