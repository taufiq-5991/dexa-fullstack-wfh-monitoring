import React, { useEffect, useState } from 'react';
import { getEmployees } from '../../api/employeeApi';
import EmployeeDetail from './EmployeeDetail';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for selected employee
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee); // Set the selected employee
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedEmployee(null); // Clear the selected employee
  };

  return (
    <div>
      <h2>Employee List</h2>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee Code</th>
            <th>Department</th>
            <th>Position</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.fullName}</td>
              <td>{employee.employeeCode}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{employee.status}</td>
              <td>
                <button onClick={() => handleEmployeeClick(employee)}>View Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Employee Detail Modal */}
      {isModalOpen && selectedEmployee && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <EmployeeDetail employee={selectedEmployee} />
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Table styles
const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

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

export default EmployeeList;