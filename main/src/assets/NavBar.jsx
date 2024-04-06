import React, { useContext, useEffect, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import './NavBar.css'; // Import CSS file for styling
import 'boxicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus ,faHouse,faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { authContext } from '../App';


const NavBar = () => {
  const location = useLocation();
  const [authState,setAuthState] = useContext(authContext);
  console.log(authState);
  useEffect(() => {
    const loggedInUser  = JSON.parse(localStorage.getItem("authenticated"));
    setAuthState(loggedInUser);
  }, []);

  if(!authState)
  {
    console.log("nothing");
    return (
      <div>
      <img src="/logo1.svg" alt="log" className="logopicmob" />
        
      <nav className="navbar">
      <img src="/logo1.svg" alt="log" className="logopic" />
        <ul >
          <li id='noi' ><Link className='nav-text' to='/'>Home</Link></li>
          <li id='noi'><Link className='nav-text' to='/Sign'>Sign Up</Link></li>
          
          <li ><Link className='nav-text' to='/Login'>Login</Link></li>
  
  
          
          
        </ul>
        <li className='mobileonly'><Link to='/'><FontAwesomeIcon icon={faHouse} color='black' /></Link></li>
        <li className='mobileonly'><Link to='/Sign'><FontAwesomeIcon icon={faUserPlus} color='black'  /></Link></li>
          
          <li className='mobileonly'><Link to='/Login'><FontAwesomeIcon icon={faRightToBracket} color='black'/></Link></li>
      </nav>
      </div>
    );
  }
  else{
  return (
    <div>
    <img src="/logo1.svg" alt="log" className="logopicmob" />
      
    <nav className="navbar">
    <img src="/logo1.svg" alt="log" className="logopic" />
      <ul >
        <li id='noi' ><Link className='nav-text' to='/'>Home</Link></li>
        <li id='noi'><Link className='nav-text' to='/loc'>Location</Link></li>
        <li id='noi'><Link className='nav-text' to='/News'>News</Link></li>
        <li ><Link className='nav-text' to='/Profile'>Profile</Link></li>


        
        
      </ul>
      <li className='mobileonly'><Link to='/'><box-icon type='solid' name='home'></box-icon></Link></li>
      <li className='mobileonly'><Link to='/loc'><box-icon name='current-location' ></box-icon></Link></li>
        <li className='mobileonly'><Link to='/News'><box-icon name='news'></box-icon></Link></li>
        <li className='mobileonly'><Link to='/Profile'><box-icon name='user-circle' type='solid' ></box-icon></Link></li>
    </nav>
    </div>
  );
}}
export default NavBar;