import React from 'react';

const EmployeeDetail = ({ employee }) => {
  return (
    <div>
      <h3>Employee Detail</h3>
      <p>Name: {employee.fullName}</p>
      <p>Email: {employee.email}</p>
      <p>Department: {employee.department}</p>
      <p>Position: {employee.position}</p>
    </div>
  );
};

export default EmployeeDetail;