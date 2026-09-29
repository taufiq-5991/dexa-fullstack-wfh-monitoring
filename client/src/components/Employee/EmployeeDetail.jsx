import React from 'react';

const EmployeeDetail = ({ employee }) => {
  return (
    <div>
      <h2>Employee Detail</h2>
      <table>
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
      </table>
      <br></br>
      <h3>Attendances</h3>
    </div>
  );
};

export default EmployeeDetail;