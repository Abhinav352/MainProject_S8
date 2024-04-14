import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Forgot.css';

const PasswordReset = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!resetToken) {
      setError('Invalid reset token');
    }
  }, [resetToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      alert('passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/login/reset-password', { resetToken, newPassword });
      alert('Password reset successfully. Redirecting to login...');

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('An error occurred while resetting the password.');
      alert('An Error occured, Please Try Again');
      console.error(err);
    }
  };

  return (
    <div className='forgot-container'>
      <div className='forgot-row'>
      <form onSubmit={handleSubmit}>
      <h1 className='forgot-h'>Reset Password<span style={{fontSize:'60px'}}>&#9786;</span></h1>
      
         <div className='formy-group'>
        
          
          <input
            type="password"
            value={newPassword}
            placeholder='New Password...'
            onChange={(e) => setNewPassword(e.target.value)}
          />
       
      
        
          <input
            type="password"
            value={confirmPassword}
            placeholder='Confirm Password..'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
      
        <button id='button2' type="submit">Reset</button>
        </div>
      </form>
      </div>
    
    </div>
  );
};

export default PasswordReset;