import React, { useEffect, useState } from 'react';
import { getEnrollmentsByUserId, deleteEnrollment } from '../../api/enrollmentApi';
import useAuth from '../../hooks/useAuth';

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEnrollments = async () => {
      const response = await getEnrollmentsByUserId(user.user_id);
      setEnrollments(response.data);
    };

    fetchEnrollments();
  }, [user]);

  const handleDelete = async (enrollmentId) => {
    await deleteEnrollment(enrollmentId);
    setEnrollments(enrollments.filter(enrollment => enrollment.enrollment_id !== enrollmentId));
  };

  return (
    <div>
      <h2>Your Enrollments</h2>
      <ul>
        {enrollments.map((enrollment) => (
          <li key={enrollment.enrollment_id}>
            Course ID: {enrollment.course_id}
            <button onClick={() => handleDelete(enrollment.enrollment_id)}>Unenroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnrollmentList;
