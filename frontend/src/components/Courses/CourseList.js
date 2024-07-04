import React, { useEffect, useState } from 'react';
import { getCourses, deleteCourse } from '../../api/courseApi';
import useAuth from '../../hooks/useAuth';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getCourses();
      setCourses(response.data);
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    await deleteCourse(courseId);
    setCourses(courses.filter(course => course.course_id !== courseId));
  };

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.course_id}>
            {course.course_name}
            {user.role === 'admin' && (
              <button onClick={() => handleDelete(course.course_id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
