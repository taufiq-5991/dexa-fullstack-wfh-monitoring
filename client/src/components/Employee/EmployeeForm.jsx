import React, { useEffect, useState } from 'react';
import { createEmployee, updateEmployee } from '../../api/employeeApi';
import { getRoles } from '../../api/rolesApi';

const EmployeeForm = ({ onClose, initialData = {}, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    username: initialData.username || '',
    password: '',
    email: initialData.email || '',
    phoneNumber: initialData.phoneNumber || '',
    department: initialData.department || '',
    position: initialData.position || '',
    roleId: initialData.roleId || '',
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
      if (isEditMode) {
        await updateEmployee(initialData.id, formData); // Update employee
        alert('Employee updated successfully!');
      } else {
        await createEmployee(formData); // Create employee
        alert('Employee created successfully!');
      }
      window.location.reload(); // Reload the page after submission
    } catch (error) {
      console.error('Failed to save employee:', error);
      alert('Failed to save employee. Please try again.');
    }
  };


  const closeModal = () => {
    setIsErrorModalOpen(false); // Close error modal
  };

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <form onSubmit={handleSubmit}>
          <h2>{isEditMode ? 'Edit Employee' : 'Create Employee'}</h2>
          <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
          <input
            name="employeeCode"
            placeholder="Employee Code"
            value={isEditMode ? initialData.employeeCode || '' : formData.employeeCode}
            onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
            disabled={isEditMode} // Disable only in edit mode
          />
          <input name="username" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
          <input type="password" name="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <input name="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
          <input name="department" placeholder="Department" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
          <input name="position" placeholder="Position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} />
          <select
            name="roleId"
            value={formData.roleId} // Pre-select the role based on formData.roleId
            onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              // option should be selected according to current role ID
              <option key={role.id} value={role.id}>
                {role.roleName}
              </option>
            ))}
          </select>
          <button type="submit">{isEditMode ? 'Update' : 'Create'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>

        {/* Error Modal */}
        {isErrorModalOpen && (
          <div style={errorModalStyles}>
            <div style={errorModalContentStyles}>
              <h2>Error</h2>
              <p>{error}</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
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
  width: '400px',
};

const errorModalStyles = {
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

const errorModalContentStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
};

export default EmployeeForm;