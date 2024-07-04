import React, { useEffect, useState } from 'react';
import { getEnrollmentsByUserId } from '../../api/enrollmentApi';
import useAuth from '../../hooks/useAuth';
import EnrollmentList from '../Enrollments/EnrollmentList';
import EnrollmentForm from '../Enrollments/EnrollmentForm';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const response = await getEnrollmentsByUserId(user.user_id);
      setEnrollments(response.data);
    };

    fetchEnrollments();
  }, [user]);

  const handleEnrollmentSuccess = () => {
    // Re-fetch enrollments
    const fetchEnrollments = async () => {
      const response = await getEnrollmentsByUserId(user.user_id);
      setEnrollments(response.data);
    };

    fetchEnrollments();
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Welcome, {user.username}</p>
      <EnrollmentForm onSuccess={handleEnrollmentSuccess} />
      <EnrollmentList enrollments={enrollments} />
    </div>
  );
};

export default StudentDashboard;


/*import React, { useEffect, useState } from 'react';
import { getEnrollmentsByUserId } from '../../api/enrollmentApi';
import useAuth from '../../hooks/useAuth';
import EnrollmentList from '../Enrollments/EnrollmentList';
import EnrollmentForm from '../Enrollments/EnrollmentForm';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const response = await getEnrollmentsByUserId(user.user_id);
      setEnrollments(response.data);
    };

    fetchEnrollments();
  }, [user]);

  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Welcome, {user.username}</p>
      <h3>Your Enrollments</h3>
      <ul>
        {enrollments.map((enrollment) => (
          <li key={enrollment.enrollment_id}>Course ID: {enrollment.course_id} (Status: {enrollment.enrollment_status})</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
*/
