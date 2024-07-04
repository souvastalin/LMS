import React, { useState } from 'react';
import { createEnrollment } from '../../api/enrollmentApi';
import useAuth from '../../hooks/useAuth';

const EnrollmentForm = ({ onSuccess }) => {
  const [courseId, setCourseId] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enrollmentData = {
      user_id: user.user_id,
      course_id: courseId,
      enrollment_status: 'active',
    };

    await createEnrollment(enrollmentData);

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enroll in a Course</h2>
      <input
        type="text"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        placeholder="Course ID"
      />
      <button type="submit">Enroll</button>
    </form>
  );
};

export default EnrollmentForm;
