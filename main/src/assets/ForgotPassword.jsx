import React, { useState } from 'react';
import axios from 'axios';
import './css/Forgot.css';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/login/forgot-password', { userEmail: email });
      alert('Password reset instructions have been sent to your email.');
      setEmail('');
    } catch (err) {
      alert('Please enter valid user email');
      console.error(err);
    }finally{
      setEmail('');
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };


  return (
    <div className='forgot-container'>
      <div className='forgot-row'>
      
        <form  className='forgoty-form'>
      <h1 className='forgot-h'>Forgot Password &#9785;</h1>
      
      <div className='formy-group'>
      <h4 className="information-text">Enter email to reset your password</h4>
        <label>
          
          <input type="email" id="user_email" placeholder = 'Enter your email here...  ' value={email} onChange={(e) => setEmail(e.target.value)}  onKeyDown={handleKeyDown} />
        </label>
        <button type="submit" onClick={handleSubmit}>Reset</button>

      </div>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default ForgotPassword;