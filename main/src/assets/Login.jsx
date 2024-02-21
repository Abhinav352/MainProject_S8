import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Map, Marker } from "pigeon-maps"
import './Login.css';


const Login = () => {
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const [authenticated, setauthenticated] = useState(null)
  


  useEffect(()=>{
    const loggedInUser = localStorage.getItem("authenticated");
    setauthenticated(loggedInUser)
},[])

const handleSignIn = async () => {
  try {
    setLoading(true);

    const response = await axios.post('http://localhost:5000/login', {
      userEmail,
      userPassword,
    });

    const data = response.data;
    localStorage.setItem('authenticated', true);
    localStorage.setItem('user',JSON.stringify(data.user));
    localStorage.setItem('token',JSON.stringify(data.token));
    localStorage.setItem('users',JSON.stringify(data.user._id));
    localStorage.setItem('userType',JSON.stringify(data.user.userType));
    localStorage.setItem('userEmail',JSON.stringify(data.user.userEmail));
    localStorage.setItem('userName',JSON.stringify(data.user.firstName));
    console.log(data);
    setEmail(data.user.userEmail);

    if (response.status === 200) {
      
      // Redirect to the home page upon successful login
      navigate('/');
    } else {
      // Handle unsuccessful login (you might want to provide more specific error messages)
      setError('Invalid username or password');
    }
  } catch (error) {
    setError('Error during login. Please try again.');
    console.error('Error during login:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
    
      <h2 className='head'>Login</h2>
      <div className='dk'><label className='jl'>Email : </label>
        <input type="email"  value={userEmail} onChange={(e) => setEmail(e.target.value)}  />
      </div>

      <div className='dk'>
        <label className='lj'>Password :  </label>
        <input type="password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
      </div>
      
      <div className='ls'>{error && <p style={{ color: 'red' }}>{error}</p>}</div>
      <div className='dk'><button onClick={handleSignIn} disabled={loading}>
        {loading ? 'Logging In...' : 'Login'}
      </button></div>
     <div className='dk'>
      <a href='http://localhost:5173/Sign'>
      <button className='li'>Sign Up </button>

      </a>
     </div>
 
    </div>
  );
};

export default Login;