import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import CSS file for styling
import 'boxicons';

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
      <li className='mobileonly'><Link to='/'><box-icon type='solid' name='home'></box-icon></Link></li>
      <li className='mobileonly'><Link to='/loc'><box-icon name='current-location' ></box-icon></Link></li>
        <li className='mobileonly'><Link to='/News'><box-icon name='news'></box-icon></Link></li>
        <li className='mobileonly'><Link to='/Login'><box-icon name='user-circle' type='solid' ></box-icon></Link></li>
    </nav>
    </div>
  );
}

export default NavBar;