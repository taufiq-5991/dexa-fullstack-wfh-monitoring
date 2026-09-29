import React, { useEffect, useState } from 'react';
import { getEmployees, getEmployeesDetail, updateEmployee, deleteEmployee } from '../../api/employeeApi';
import EmployeeDetail from './EmployeeDetail';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for selected employee
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State for detail modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [isLoading, setIsLoading] = useState(false); // Loading state for actions

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

  const handleViewDetail = async (employee) => {
    try {
      setIsLoading(true);
      const data = await getEmployeesDetail(employee.id); // Fetch employee details and attendances
      setSelectedEmployee(data); // Set the fetched data
      setIsDetailModalOpen(true); // Open detail modal
    } catch (error) {
      console.error('Failed to fetch employee details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee); // Set selected employee for editing
    setIsEditModalOpen(true); // Open edit modal
  };

  const handleDelete = (employee) => {
    setSelectedEmployee(employee); // Set selected employee for deletion
    setIsDeleteModalOpen(true); // Open delete confirmation modal
  };

  const confirmDelete = async () => {
    try {
      setIsLoading(true);
      await deleteEmployee(selectedEmployee.id); // Delete employee
      setEmployees(employees.filter((emp) => emp.id !== selectedEmployee.id)); // Remove from list
      setIsDeleteModalOpen(false); // Close delete modal
      alert('Employee deleted successfully!');
    } catch (error) {
      console.error('Failed to delete employee:', error);
      alert('Failed to delete employee. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModals = () => {
    setIsDetailModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div>
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
                <button style={{ marginRight: '12px' }} onClick={() => handleViewDetail(employee)}>
                  View Detail
                </button>
                <button style={{ marginRight: '12px' }} onClick={() => handleEdit(employee)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(employee)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Employee Detail Modal */}
      {isDetailModalOpen && selectedEmployee && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <EmployeeDetail employee={selectedEmployee} />
            <button onClick={closeModals}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {isEditModalOpen && selectedEmployee && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <EmployeeForm
              onClose={closeModals}
              initialData={selectedEmployee} // Pass initial data to prefill form
              isEditMode={true} // Indicate edit mode
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedEmployee && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete {selectedEmployee.fullName}?</p>
            <button onClick={confirmDelete} disabled={isLoading}>
              {isLoading ? 'Deleting...' : 'Confirm'}
            </button>
            <button onClick={closeModals}>Cancel</button>
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