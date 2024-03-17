import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    setauthenticated(loggedInUser);
  }, []);

  const handleSignIn = async () => {
    try {
      setLoading(true);

      const response = await axios.post('http://localhost:5000/login', {
        userEmail,
        userPassword,
      });

      const data = response.data;
      localStorage.setItem('authenticated', true);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('users', JSON.stringify(data.user._id));
      localStorage.setItem('userType', JSON.stringify(data.user.userType));
      localStorage.setItem('userEmail', JSON.stringify(data.user.userEmail));
      localStorage.setItem('userName', JSON.stringify(data.user.firstName));
      setEmail(data.user.userEmail);

      if (response.status === 200) {
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error during login. Please try again.');
      console.error('Error during login:', error);
      window.alert('Error during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/Sign');
  };

  return (
    <div id='wrapper'>
      <form >
      <h2>Login</h2>
      <div id="input-field">
      <label>Enter your email</label>
      <div></div>
        <input type="email" value={userEmail} onChange={(e) => setEmail(e.target.value)} />
        
      </div>
      <div id='space'></div>
      
      <div id="input-field">
        
      <label>Enter Your Password </label>
        <input type="password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
       </div>
       
      
      <div id='forget'>
        <label for="remember">
          <input type="checkbox" id='remember' />
          <p>Remember me</p>
        </label>
        <a href="#" id='pass'>Forgot Password?</a>
      </div>
      
      
        <button onClick={handleSignIn} disabled={loading} id='but'>
          {loading ? 'Logging In...' : 'Log In'}
        </button>
        <div id='register'>
        <p>Don't have an account? <a href="/Sign">Register</a> </p>
      </div>
      </form>
    </div>
  );
};

export default Login;