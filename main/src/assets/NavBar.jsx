import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import CSS file for styling


const NavBar = () => {
  return (
    <div>
      <img src="/logo1.svg" alt="log" className="logopic" />
    <nav className="navbar">
      
      <ul >
        <li ><Link to='/'>Home</Link></li>
        <li ><Link to='/loc'>Location</Link></li>
        <li ><Link to='/News'>News</Link></li>
        <li ><Link to='/Login'>Login</Link></li>
        
        
      </ul>
    </nav>
    </div>
  );
}

export default NavBar;