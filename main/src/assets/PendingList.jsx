import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PendingList = () => {
  const [requests, setRequests] = useState([]);
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

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
  return (
    <div>
      <h2>Requests List</h2>
      <ul className="news-list">
        {requests.map((request) => (
          <li key={request._id} className='news-item'>
            <strong>Item Type:</strong> {request.itemType},{' '}
            <strong>Description:</strong> {request.description},{' '}
            <strong>Username:</strong> {request.username},{' '}
            <strong>Email:</strong> {request.email},
            <button onClick={() => handleDeleteRequest(request._id)}>Delete</button>

          </li>
        ))}
      </ul>
    </div>
  );
        
        
};

export default PendingList;