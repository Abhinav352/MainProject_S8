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
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/Sign');
  };

  return (
    <div className='head'>
      <h2>Login</h2>
      <div className="input-Email">
        <label>Email :</label>
        <input type="email" value={userEmail} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="input-Password">
        <label>Password :</label>
        <input type="password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
      </div>
      
      <div>{error && <p style={{ color: 'red' }}>{error}</p>}</div>
      
      <div>
        <button onClick={handleSignIn} disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </div>

      <div>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;