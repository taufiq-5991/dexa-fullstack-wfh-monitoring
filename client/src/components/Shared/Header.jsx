import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // only show when logged in
  return user ? (
    <header style={headerStyles}>
      <div style={headerContentStyles}>
        <h1 style={titleStyles}>WFH Monitoring System</h1>
        <div style={userInfoStyles}>
          <span>Hello, {user?.fullName ?? user?.username}</span>
          <button onClick={handleLogout} style={logoutButtonStyles}>Logout</button>
        </div>
      </div>
    </header>
  ) : (<header></header>);
};

// Styles
const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#f4f4f4',
  borderBottom: '1px solid #ddd',
};

const headerContentStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
};

const titleStyles = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 'bold',
};

const userInfoStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const logoutButtonStyles = {
  padding: '5px 10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Header;