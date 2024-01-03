import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Map, Marker } from "pigeon-maps"


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
    localStorage.setItem('userType',JSON.stringify(data.user.userType));
    localStorage.setItem('userEmail',JSON.stringify(data.user.userEmail));
    console.log(data);

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
      <h2>Login</h2>
      <label>Email:
        <input type="email" value={userEmail} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>Password:
        <input type="password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? 'Logging In...' : 'Login'}
      </button>
     
    <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
      <Marker width={50} anchor={[50.879, 4.6997]} />
    </Map>
    </div>
  );
};

export default Login;