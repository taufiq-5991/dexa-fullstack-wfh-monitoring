import React from 'react';
import AttendanceList from '../components/Dashboard/AttendanceList';
import ClockInButton from '../components/Dashboard/ClockInButton';
import ClockOutButton from '../components/Dashboard/ClockOutButton';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Your Attendances</h2>
      <AttendanceList />
      <div>
        <table>
          <tr>
            <td>
              <ClockInButton />
            </td>
            <td>
              <ClockOutButton />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;