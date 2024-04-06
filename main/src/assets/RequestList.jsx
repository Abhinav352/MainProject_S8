// Import necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Navigate } from 'react-router-dom';

import { authContext } from '../App';
import { useContext } from 'react';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const [authState,setAuthState] = useContext(authContext);
  const userType=JSON.parse(localStorage.getItem("userType"));

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error.message);
      }
    };

    fetchRequests();
  }, []);

  const handleContactClick = async (userEmail, userName) => {
    try {
      const currentUserEmail = localStorage.getItem('userEmail');
      const currentUserName = localStorage.getItem('userName');

      // Check if a room with the given user emails already exists
      const response = await axios.post('http://localhost:5000/createRoom', {
        user1: currentUserEmail,
        user2: userEmail,
        userName1: currentUserName, // Include the current user's userName
        userName2: userName,      // Include the other user's userName
      });

      // Navigate to the chat with both user emails and room ID
      navigate(`/chat/${response.data.roomId}`, { state: { user1: currentUserEmail, user2: userEmail, userName2: userName } });
    } catch (error) {
      console.error('Error navigating to chat room:', error.message);
    }
  };
if(authState)
{
  if(userType==="volunteer")
  {
  return (
    <div className='table-container' id='table-container' >
     
     
      <div className="table-content">
      
      
      <table>
      
      <thead>
        <tr>
          <th>Item Type</th>
          <th>Description</th>
          <th>Username</th>
          <th>Email</th>
          <th>Actions</th>
          </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request._id}>
            <td>{request.itemType}</td>
            <td>{request.description}</td>
            <td>{JSON.parse(request.username)}</td>
            <td>{JSON.parse(request.email)}</td>
            <td><button id= 'buto' onClick={() => handleContactClick(request.email, request.username)}>Contact</button></td>
          </tr>
        ))}
      </tbody>
    </table>



      </div>
    </div>
  );
}
else{
  return(<Navigate to='/'/>)
  ;
}
}
else{
  return(<Navigate to='/Login'/>)
}
};

export default RequestList;
