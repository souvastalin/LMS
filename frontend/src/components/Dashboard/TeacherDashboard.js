import React, { useEffect, useState } from 'react';
import { getCourses } from '../../api/courseApi';
import useAuth from '../../hooks/useAuth';
import CourseList from '../Courses/CourseList';
import CourseForm from '../Courses/CourseForm';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getCourses();
      setCourses(response.data.filter(course => course.user_id === user.user_id));
    };

    fetchCourses();
  }, [user]);

  const handleCourseSuccess = () => {
    // Re-fetch courses
    const fetchCourses = async () => {
      const response = await getCourses();
      setCourses(response.data.filter(course => course.user_id === user.user_id));
    };

    fetchCourses();
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <p>Welcome, {user.username}</p>
      <CourseForm onSuccess={handleCourseSuccess} />
      <CourseList courses={courses} />
    </div>
  );
};

export default TeacherDashboard;



/* 
import React, { useEffect, useState } from 'react';
import { getCourses } from '../../api/courseApi';
import useAuth from '../../hooks/useAuth';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getCourses();
      setCourses(response.data.filter(course => course.user_id === user.user_id));
    };

    fetchCourses();
  }, [user]);

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <p>Welcome, {user.username}</p>
      <h3>Your Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.course_id}>{course.course_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;
*/
