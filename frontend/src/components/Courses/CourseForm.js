import React, { useState } from 'react';
import { createCourse, updateCourse } from '../../api/courseApi';

const CourseForm = ({ course, onSuccess }) => {
  const [courseName, setCourseName] = useState(course ? course.course_name : '');
  const [courseDescription, setCourseDescription] = useState(course ? course.course_description : '');
  const [courseStatus, setCourseStatus] = useState(course ? course.course_status : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      course_name: courseName,
      course_description: courseDescription,
      course_status: courseStatus,
    };

    if (course) {
      await updateCourse(course.course_id, courseData);
    } else {
      await createCourse(courseData);
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{course ? 'Edit Course' : 'Add Course'}</h2>
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Course Name"
      />
      <input
        type="text"
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
        placeholder="Course Description"
      />
      <input
        type="text"
        value={courseStatus}
        onChange={(e) => setCourseStatus(e.target.value)}
        placeholder="Course Status"
      />
      <button type="submit">{course ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default CourseForm;
