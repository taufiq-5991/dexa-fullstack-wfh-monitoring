import React from 'react';
import EmployeeList from '../components/Employee/EmployeeList';
import EmployeeForm from '../components/Employee/EmployeeForm';

const AdminMonitoringPage = () => {
  return (
    <div>
      <h1>Admin Monitoring</h1>
      <EmployeeForm />
      <EmployeeList />
    </div>
  );
};

export default AdminMonitoringPage;