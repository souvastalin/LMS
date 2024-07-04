const pool = require('../config/db.js'); // Ensure this path is correct

// Create a new course
const createCourse = async (req, res) => {
  const { course_name, description, teacher_id } = req.body;

  try {
    const newCourse = await pool.query(
      'INSERT INTO courses (course_name, description, teacher_id) VALUES ($1, $2, $3) RETURNING *',
      [course_name, description, teacher_id]
    );

    res.status(201).json(newCourse.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await pool.query('SELECT * FROM courses');
    res.status(200).json(courses.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single course by ID
const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await pool.query('SELECT * FROM courses WHERE course_id = $1', [id]);
    if (course.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(course.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { course_name, description } = req.body;

  try {
    const updatedCourse = await pool.query(
      'UPDATE courses SET course_name = $1, description = $2 WHERE course_id = $3 RETURNING *',
      [course_name, description, id]
    );

    if (updatedCourse.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(updatedCourse.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await pool.query('DELETE FROM courses WHERE course_id = $1 RETURNING *', [id]);
    if (deletedCourse.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
