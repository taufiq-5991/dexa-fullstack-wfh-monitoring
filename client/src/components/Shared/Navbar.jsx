import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../Auth/LogoutButton';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/employees">Employees</Link></li>
        <li><LogoutButton /></li>
      </ul>
    </nav>
  );
};

export default Navbar;