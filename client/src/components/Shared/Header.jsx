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
    <header>
      <div>
        <table style={{marginLeft: 'auto', marginRight: '0px'}}>
          <tr>
            <td>
              <span>Hello, {user?.fullName ?? user?.username}</span>
            </td>
            <td>
              <button onClick={handleLogout}>Logout</button>
            </td>
          </tr>
        </table>
      </div>
    </header>
  ) : (<header></header>);
};

export default Header;