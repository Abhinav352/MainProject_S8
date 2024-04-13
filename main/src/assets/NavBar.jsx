import React, { useContext, useEffect, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import './NavBar.css'; // Import CSS file for styling
import 'boxicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus ,faHouse,faRightToBracket,faKitMedical,faNewspaper,faUser,faTableList,faHandHoldingMedical} from '@fortawesome/free-solid-svg-icons';

import { authContext } from '../App';


const NavBar = () => {
  const location = useLocation();
  const [authState,setAuthState] = useContext(authContext);
  const userType = JSON.parse(localStorage.getItem("userType"));
  console.log(authState);
  useEffect(() => {
    const loggedInUser  = JSON.parse(localStorage.getItem("authenticated"));
    setAuthState(loggedInUser);
  }, []);

  if(!authState)
  {
    return (
      <div>
      <img src="/logo-black.svg" alt="log" className="logopicmob" />
        
      <nav className="navbar">
      <img src="/logo1.svg" alt="log" className="logopic" />
        <ul >
          <li id='noi' ><Link className='nav-text' to='/'>Home</Link></li>
          <li id='noi'><Link className='nav-text' to='/Sign'>Sign Up</Link></li>
          
          <li ><Link className='nav-text' to='/Login'>Login</Link></li>
  
  
          
          
        </ul>
        <li className='mobileonl'><Link to='/'><FontAwesomeIcon icon={faHouse} color='black' /></Link></li>
        <li className='mobileonl'><Link to='/Sign'><FontAwesomeIcon icon={faUserPlus} color='black'  /></Link></li>
          
          <li className='mobileonl'><Link to='/Login'><FontAwesomeIcon icon={faRightToBracket} color='black'/></Link></li>
      </nav>
      </div>
    );
  }
  else{
    if(userType==="volunteer")
    {
      // console.log(userType);
  return (
    <div>
    <img src="/logo-black.svg" alt="log" className="logopicmob" />
      
    <nav className="navbar">
    <img src="/logo1.svg" alt="log" className="logopic" />
      <ul >
        <li id='noi' ><Link className='nav-text' to='/'>Home</Link></li>
        <li id='noi'><Link className='nav-text' to='/Emergency'>Urgency</Link></li>
        <li id='noi'><Link className='nav-text' to='/List'>List</Link></li>
        <li id='noi'><Link className='nav-text' to='/News'>News</Link></li>
        <li ><Link className='nav-text' to='/Profile'>Profile</Link></li>
        <li ><Link className='nav-text' to='/Messages'>Message</Link></li>


        
        
      </ul>
      <li className='mobileonl'><Link to='/'><FontAwesomeIcon icon={faHouse} color='black' /></Link></li>
      <li className='mobileonl'><Link to='/Emergency'><FontAwesomeIcon icon={faKitMedical} color='black' opacity={0.8} /></Link></li>
        <li className='mobileonl'><Link to='/List'><FontAwesomeIcon icon={faTableList} color='black' opacity={0.8}/></Link></li>
      
    </nav>
    </div>
  );
}
else{
  return (
    <div>
    <img src="/logo-black.svg" alt="log" className="logopicmob" />
      
    <nav className="navbar">
    <img src="/logo1.svg" alt="log" className="logopic" />
      <ul >
        <li id='noi' ><Link className='nav-text' to='/'>Home</Link></li>
        <li id='noi' ><Link className='nav-text' to='/Req'>Help</Link></li>
        <li id='noi'><Link className='nav-text' to='/Pending'>List</Link></li>
        <li id='noi'><Link className='nav-text' to='/News'>News</Link></li>
        <li ><Link className='nav-text' to='/Profile'>Profile</Link></li>
        <li ><Link className='nav-text' to='/Messages'>Message</Link></li>


        
        
      </ul>
      <li className='mobileonl'><Link to='/'><FontAwesomeIcon icon={faHouse} color='black' /></Link></li>
      <li className='mobileonl'><Link to='/Req'><FontAwesomeIcon icon={faHandHoldingMedical} color='black' opacity={0.8} /></Link></li>
      <li className='mobileonl'><Link to='/Pending'><FontAwesomeIcon icon={faTableList} color='black' opacity={0.8}/></Link></li>
    </nav>
    </div>
  );
}}
}
export default NavBar;