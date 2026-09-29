import React, { useEffect, useState } from 'react';
import { getEmployees, getEmployeesDetail, deleteEmployee } from '../../api/employeeApi';
import EmployeeDetail from './EmployeeDetail';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sortedEmployees = [...employees].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setEmployees(sortedEmployees);
  };

  const handleViewDetail = async (employee) => {
    try {
      setIsLoading(true);
      const data = await getEmployeesDetail(employee.id);
      setSelectedEmployee(data);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch employee details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsLoading(true);
      await deleteEmployee(selectedEmployee.id);
      setEmployees(employees.filter((emp) => emp.id !== selectedEmployee.id));
      setIsDeleteModalOpen(false);
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
        <thead style={headerStyles}>
          <tr>
            <th>
              Name
              <a onClick={() => handleSort('fullName')}>↕️</a>
            </th>
            <th>
              Employee Code
              <a onClick={() => handleSort('employeeCode')}>↕️</a>
            </th>
            <th>
              Department
              <a onClick={() => handleSort('department')}>↕️</a>
            </th>
            <th>
              Position
              <a onClick={() => handleSort('position')}>↕️</a>
            </th>
            <th>
              Role
              <a onClick={() => handleSort('roleName')}>↕️</a>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id} style={index % 2 === 0 ? rowStyles.even : rowStyles.odd}>
              <td>{employee.fullName}</td>
              <td>{employee.employeeCode}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{employee.roleName}</td>
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
              initialData={selectedEmployee}
              isEditMode={true}
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

const headerStyles = {
  backgroundColor: '#989898',
  color: '#fff',
  textAlign: 'left',
};

const rowStyles = {
  even: {
    backgroundColor: '#f9f9f9',
  },
  odd: {
    backgroundColor: '#fff',
  },
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