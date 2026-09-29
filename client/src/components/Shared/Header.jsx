import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      <div>
        <span>{user?.name} - {user?.position}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;