import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/userApi';
import useAuth from '../../hooks/useAuth';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user.username}</p>
      <h3>All Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>{user.user_name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
