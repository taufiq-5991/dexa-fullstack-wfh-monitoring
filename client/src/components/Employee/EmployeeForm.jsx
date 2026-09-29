import React, { useEffect, useState } from 'react';
import { createEmployee } from '../../api/employeeApi';
import { getRoles } from '../../api/rolesApi';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    department: '',
    position: '',
    roleId: '', // Add roleId to form data
  });

  const [roles, setRoles] = useState([]); // State to store roles
  const [error, setError] = useState(null); // State to store error message
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // State to control error modal visibility

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data); // Set roles data
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchRoles();
  }, []);

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
      setError('Failed to create employee. Please try again.'); // Set error message
      setIsErrorModalOpen(true); // Open error modal
    }
  };

  const closeModal = () => {
    setIsErrorModalOpen(false); // Close error modal
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} />
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
        <input name="department" placeholder="Department" onChange={handleChange} />
        <input name="position" placeholder="Position" onChange={handleChange} />
        
        {/* Roles Dropdown */}
        <select name="roleId" value={formData.roleId} onChange={handleChange}>
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.roleName}
            </option>
          ))}
        </select>

        <button type="submit">Create Employee</button>
      </form>

      {/* Error Modal */}
      {isErrorModalOpen && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal styles
const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
};

export default EmployeeForm;