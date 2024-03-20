import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import CSS file for styling
import 'boxicons';

const NavBar = () => {
  return (
    <div>
    <img src="/logo1.svg" alt="log" className="logopicmob" />
      
    <nav className="navbar">
    <img src="/logo-black.svg" alt="log" className="logopic" />
      <ul >
        <li id='noi' ><Link className='nav-text' to='/'>Home</Link></li>
        <li id='noi'><Link className='nav-text' to='/loc'>Location</Link></li>
        <li id='noi'><Link className='nav-text' to='/News'>News</Link></li>
        <li ><Link className='nav-text' to='/Login'>Login</Link></li>


        
        
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