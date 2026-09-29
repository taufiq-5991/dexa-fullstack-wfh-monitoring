import React from 'react';
import dayjs from 'dayjs';

const EmployeeDetail = ({ employee }) => {
  return (
    <div>
      <h2>Employee Detail</h2>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>: {employee.fullName}</td>
          </tr>
          <tr>
            <td>Employee Code</td>
            <td>: {employee.employeeCode}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>: {employee.username}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>: {employee.email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>: {employee.phoneNumber}</td>
          </tr>
          <tr>
            <td>Department</td>
            <td>: {employee.department}</td>
          </tr>
          <tr>
            <td>Position</td>
            <td>: {employee.position}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>: {employee.status}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <h3>Attendances</h3>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Clock In</th>
            <th>Clock Out</th>
          </tr>
        </thead>
        <tbody>
          {employee.attendances && employee.attendances.length > 0 ? (
            employee.attendances.map((attendance) => (
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
            ))
          ) : (
            <tr>
              <td colSpan="3">No attendances found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Table styles
const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

export default EmployeeDetail;