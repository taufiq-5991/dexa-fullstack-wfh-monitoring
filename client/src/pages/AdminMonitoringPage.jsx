import React, { useState } from 'react';
import EmployeeList from '../components/Employee/EmployeeList';
import EmployeeForm from '../components/Employee/EmployeeForm';

const AdminMonitoringPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleOpenModal = () => setIsModalOpen(true); // Open the modal
  const handleCloseModal = () => setIsModalOpen(false); // Close the modal

  return (
    <div>
      <table style={{ width: '120%' }}>
        <tr>
          <td>
            <h1>Employee List</h1>
          </td>
          <td>
            <button onClick={handleOpenModal}>Create Employee</button>
          </td>
        </tr>
      </table>

      {/* Employee Form Modal */}
      {isModalOpen && (
        <EmployeeForm onClose={handleCloseModal} />
      )}

      <EmployeeList />
    </div>
  );
};

export default AdminMonitoringPage;