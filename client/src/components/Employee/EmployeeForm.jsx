import React, { useState } from 'react';
import { createEmployee } from '../../api/employeeApi';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    position: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(formData);
      alert('Employee created successfully!');
    } catch (error) {
      console.error('Failed to create employee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="department" placeholder="Department" onChange={handleChange} />
      <input name="position" placeholder="Position" onChange={handleChange} />
      <button type="submit">Create Employee</button>
    </form>
  );
};

export default EmployeeForm;