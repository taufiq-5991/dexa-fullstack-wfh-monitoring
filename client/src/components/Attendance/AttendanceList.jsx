import React, { useEffect, useState } from 'react';
import { getAttendances } from '../../api/attendanceApi';

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const data = await getAttendances();
        setAttendances(data);
      } catch (error) {
        console.error('Failed to fetch attendances:', error);
      }
    };

    fetchAttendances();
  }, []);

  return (
    <div>
      <h2>Attendance List</h2>
      <ul>
        {attendances.map((attendance) => (
          <li key={attendance.id}>
            {attendance.attendanceDate} - {attendance.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceList;