import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/attendances/my-attendances`, {
          headers: { Authorization: `${token}` },
        });
        setAttendances(response.data);
      } catch (error) {
        console.error('Failed to fetch attendances:', error);
      }
    };

    fetchAttendances();
  }, []);

  return (
    <div>
      <ul>
        {attendances.map((attendance) => (
          <li key={attendance.id}>
            {attendance.attendanceDate} - Clock In: {attendance.clockIn || 'N/A'} - Clock Out: {attendance.clockOut || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceList;