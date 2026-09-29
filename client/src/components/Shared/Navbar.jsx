import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation(); // Get the current route

  // only show when logged in
  return user ? (
    <aside style={navbarStyles}>
      <div style={linkContainerStyles}>
        <Link
          to="/dashboard"
          style={{
            ...linkStyles,
            ...(location.pathname === '/dashboard' ? activeLinkStyles : {}),
          }}
        >
          My Attendances
        </Link>
        {user?.role === 'Admin HRD' && (
          <Link
            to="/admin-monitoring"
            style={{
              ...linkStyles,
              ...(location.pathname === '/admin-monitoring' ? activeLinkStyles : {}),
            }}
          >
            Admin Monitoring
          </Link>
        )}
      </div>
    </aside>
  ) : (<aside></aside>);
};

// Styles
const navbarStyles = {
  background: '#dddddd',
  padding: '10px 20px',
};

const linkContainerStyles = {
  display: 'flex',
  gap: '20px', // Add gap between links
};

const linkStyles = {
  textDecoration: 'none',
  color: '#000',
  fontWeight: 'bold',
  border: '2px solid transparent',
  borderRadius: '10px', 
  padding: '5px',
};

const activeLinkStyles = {
  color: '#000', // Highlight current page
  border: '2px solid #000',
  borderRadius: '10px', 
  padding: '5px',
};

export default Navbar;