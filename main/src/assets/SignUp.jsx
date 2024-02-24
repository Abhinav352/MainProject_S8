// SignUp.js
import React, { useState } from 'react';
import './Signup.css';
import { Navigate } from 'react-router-dom';

const SignUp = () => {
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState('non-volunteer');

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
    } finally {
      setLoading(false);
    }
  };

  const handleback = () => {
    Navigate('/Login');
  };



  return (
    <div className='head1'>
      <h2>Sign Up</h2>
     
     <div className='input-email'>
      <label>Email : </label>
        <input type="email" value={userEmail} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className='input-pass'>
      <label>Password :   </label>
        <input type="password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className='input-fname'>
      <label>First Name : </label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>

      <div className='input-lname'>
      <label>Last Name : </label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      
      <div className='input-user'>
      <label>
        User Type : </label>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="non-volunteer">Non-Volunteer</option>
          <option value="volunteer">Volunteer</option>
        </select>
      </div>

      <div>{error && <p style={{ color: 'red' }}>{error}</p>}</div>
     
      <div>
      <button onClick={handleSignUp} disabled={loading}>
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button></div>
    
    <div>
      <button onClick={handleback}>Cancel</button>
    </div>

    </div>
  );
};

export default SignUp;
