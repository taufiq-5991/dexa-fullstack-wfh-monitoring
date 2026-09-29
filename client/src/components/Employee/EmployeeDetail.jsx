import React from 'react';

const EmployeeDetail = ({ employee }) => {
  return (
    <div>
      <h3>Employee Detail</h3>
      <p>Name: {employee.fullName}</p>
      <p>Employee Code: {employee.employeeCode}</p>
      <p>Username: {employee.username}</p>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phoneNumber}</p>
      <p>Department: {employee.department}</p>
      <p>Position: {employee.position}</p>
      <p>Status: {employee.status}</p>
    </div>
  );
};

export default EmployeeDetail;