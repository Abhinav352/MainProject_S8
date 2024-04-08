
import React, { useState } from 'react';
import './Signup.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Add this line
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
  const [showPassword, setShowPassword] = useState(false); // Add this line
  const navigate = useNavigate();
  const theme = useTheme();

  const [emailExists, setEmailExists] = useState(null);
  const [number, setNumber] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setNumber(` ${value}`);
    }
  };

  const togglePasswordVisibility = () => { // Add this function
    setShowPassword(!showPassword);
  };
  
 

  const handleSignUp = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, userPassword, userType, firstName, lastName, number }),
      });

      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        navigate('/Login');
      }
      // Clear form fields after successful signup
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setNumber('');
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
        <h2 id='heady'>Sign Up</h2>
        <div id='mesg_body'>
          {/* Existing email check message */}
          <div id='field'>
            <label>Email</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => {
                setEmail(e.target.value);
                checkEmailExists(e.target.value);
              }}
            />
          </div>
          {/* Password input with show password functionality */}
          <div id='field'>
            <label>Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={userPassword}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FiEyeOff className="password-toggle-icon" onClick={togglePasswordVisibility} />
              ) : (
                <FiEye className="password-toggle-icon" onClick={togglePasswordVisibility} />
              )}
            </div>
          </div>
          {/* Remaining input fields */}
          <div id='space'></div>
          <div id='field'>
            <label>First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div id='space'></div>
          <div id='field'>
            <label>Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div id='fiel'>
            <label>Phone</label>
            <input
              type="text"
              value={number}
              onChange={handleNumberChange}
              pattern=" \d{10}"
              maxLength={11}
              inputMode="numeric"
            />
          </div>
          <div id='space'></div>
          <div id='field'></div>
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
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);
};


export default SignUp;
