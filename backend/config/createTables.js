const pool = require('./db');

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Roles (
        role_id SERIAL PRIMARY KEY,
        role_name VARCHAR(255) NOT NULL,
        role_status VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Users (
        user_id SERIAL PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role_id INTEGER REFERENCES Roles(role_id),
        user_status VARCHAR(255) NOT NULL,
        status_updated_at TIMESTAMP,
        status_updated_by INTEGER,
        signed_up_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS Courses (
        course_id SERIAL PRIMARY KEY,
        course_name VARCHAR(255) NOT NULL,
        course_description TEXT,
        user_id INTEGER REFERENCES Users(user_id),
        course_status VARCHAR(255) NOT NULL,
        course_updated_at TIMESTAMP,
        course_entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS Enrollments (
        enrollment_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users(user_id),
        course_id INTEGER REFERENCES Courses(course_id),
        enrolled_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        enrollment_status VARCHAR(255) NOT NULL,
        enrollment_updated_at TIMESTAMP
      );
    `);
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables', error);
  }
};

createTables();
