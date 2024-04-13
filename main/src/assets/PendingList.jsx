import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Navigate } from 'react-router-dom';
import './css/pending.css'
import { authContext } from '../App';
import { useContext } from 'react';
const PendingList = () => {
  const [requests, setRequests] = useState([]);
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const [authState,setAuthState] = useContext(authContext);

  useEffect(() => {
    // Fetch requests from the backend when the component mounts
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pend/requests?email=${email}`);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error.message);
      }
    };

    fetchRequests();
  }, []); // Empty dependency array ensures that the effect runs only once on mount
  
  const handleDeleteRequest = async (requestId) => {
    try {
      // Make a DELETE request to the backend to delete the request
      await axios.delete(`http://localhost:5000/requests/${requestId}`);

      // Update the local state to reflect the deleted request
      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== requestId));
    } catch (error) {
      console.error('Error deleting request:', error.message);
    }
  };
  if(authState)
  {
  return (
    <div className='table-container' id='table-container'>
    <div className='table-content'>
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
            <td><button id= 'buto' onClick={() => handleDeleteRequest(request._id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
  );
        }
 else{
  return(<Navigate to='/Login'/>)
 }           
        
};

export default PendingList;