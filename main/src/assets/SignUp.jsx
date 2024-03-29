
import React, { useState } from 'react';
import './Signup.css';
import { Navigate } from 'react-router-dom';
import { Select, MenuItem, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SignUp = () => {
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState('non-volunteer');
  const theme = useTheme();
  const [emailExists, setEmailExists] = useState(null);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  
  const handleSignUp = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, userPassword, userType, firstName, lastName }),
      });

      const data = await response.json();
      console.log(data);

      // Clear form fields after successful signup
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
    } catch (error) {
      setError('Error during sign up. Please try again.');
      console.error('Error during sign up:', error);
      window.alert('Error during sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/check-email?email=${email}`);
      const data = await response.json();
      setEmailExists(data.exists);
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };
 



  return (
    <div className='signback'>
      <div className='anch'></div>
    <div id='wrap'>
      <form>
      <h2>Sign Up</h2>
      {emailExists !== null && (
    <span style={{ color: emailExists ? 'red' : 'white',  display:'block'  }} className='errmsg'>
      {emailExists ? 'Email already exists' : 'Email available...'}
    </span>
  )}
      <div id='field'>
        
  <label>Email </label>
  <input
    type="email"
    value={userEmail}
    onChange={(e) => {
      setEmail(e.target.value);
      checkEmailExists(e.target.value);
    }}
  />
  
</div>
<div className='pass2'></div>
      <div id='field'>
      <label>Password  </label>
        <input type="password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div id='space'></div>
      <div id='field'>
      <label>First Name </label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div id='space'></div>
      <div id='field'>
      <label>Last Name  </label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      
      <div id='spa'></div>
      <div>
      <label htmlFor="userTypeSelect" id='typelabel'> User Type</label>
      <select id="userTypeSelect" value={userType} onChange={handleUserTypeChange}>
        <option value="volunteer">Volunteer</option>
        <option value="non-volunteer">Non-Volunteer</option>
      </select>
    </div>
 
      <div>
      <button onClick={handleSignUp} disabled={loading} id='bu'>
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button></div> 
      
    
    </form>
    </div>
    
    </div>
  );
};

export default SignUp;
