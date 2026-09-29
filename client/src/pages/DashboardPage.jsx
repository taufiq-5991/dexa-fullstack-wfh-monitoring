import React from 'react';
import AttendanceList from '../components/Dashboard/AttendanceList';
import ClockInButton from '../components/Dashboard/ClockInButton';
import ClockOutButton from '../components/Dashboard/ClockOutButton';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.fullName ?? user?.username}</h1>
      <h2>Your Attendances</h2>
      <AttendanceList />
      <div>
        <ClockInButton />
        <ClockOutButton />
      </div>
    </div>
  );
};

export default DashboardPage;