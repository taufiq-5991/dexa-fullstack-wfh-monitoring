import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen }) => {
  const { user } = useAuth();

  return (
    <aside style={{ display: isOpen ? 'block' : 'none' }}>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          {user?.role === 'Admin HRD' && (
            <>
              <li><Link to="/admin-monitoring">Admin Monitoring</Link></li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;