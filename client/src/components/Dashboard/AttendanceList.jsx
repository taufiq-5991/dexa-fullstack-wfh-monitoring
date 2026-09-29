import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_URL_VERSION}/attendances/my-attendances`, {
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
      <table style={tableStyles}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Clock In</th>
            <th>Clock Out</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((attendance) => (
            <tr key={attendance.id}>
              <td>{attendance.attendanceDate}</td>
              <td>
                {attendance?.clockIn ? (
                  <a
                    href={`${process.env.REACT_APP_API_URL}/${attendance.photoPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer' }}
                  >
                    {dayjs(attendance.clockIn).format('HH:mm:ss')}
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td>
                {attendance?.clockOut ? (
                  <a
                  href={`${process.env.REACT_APP_API_URL}/${attendance.photoPathOut}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer' }}
                  >
                    {dayjs(attendance.clockOut).format('HH:mm:ss')}
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Table styles
const tableStyles = {
  width: '80%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

export default AttendanceList;