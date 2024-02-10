import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import CSS file for styling


const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/loc'>Location</Link></li>
        <li><Link to='/News'>News</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}

export default NavBar;