import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import TeacherDashboard from '../components/Dashboard/TeacherDashboard';
import StudentDashboard from '../components/Dashboard/StudentDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'teacher' && <TeacherDashboard />}
      {user.role === 'student' && <StudentDashboard />}
    </div>
  );
};

export default Dashboard;
