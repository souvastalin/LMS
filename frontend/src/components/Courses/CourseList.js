import React from 'react';
import { deleteCourse } from '../../api/courseApi';

const CourseList = ({ courses, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    
  if (error) return <div>Error: {error}</div>;

  const handleDelete = async (courseId) => {
    try {
      await deleteCourse(courseId);
      // setCourses is no longer available here,
      // the parent component (Courses.js) handles updating the courses
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses && courses.map((course) => (
          <li key={course.course_id}>
            {course.course_name}            
              <button onClick={() => handleDelete(course.course_id)}>Delete</button>            
          
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;

