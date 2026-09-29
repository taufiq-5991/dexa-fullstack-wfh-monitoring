import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  // only show when logged in
  return user ? (
    <aside style={{background: '#dddddd'  }}>
      <table style={{ margin: '25px', padding: '10px'}}>
        <tr>
          <td>
            <li><Link to="/dashboard">My Attendances</Link></li>
          </td>
          {user?.role === 'Admin HRD' && (
            <>
              <td><Link to="/admin-monitoring">Admin Monitoring</Link></td>
            </>
          )}
        </tr>
      </table>
    </aside>
  ) : (<aside></aside>);
};

export default Navbar;