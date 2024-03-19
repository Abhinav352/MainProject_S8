// Import necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div>
      <h2>Requests List</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <strong>Item Type:</strong> {request.itemType},{' '}
            <strong>Description:</strong> {request.description},{' '}
            <strong>Username:</strong> {request.username},{' '}
            <strong>Email:</strong> {request.email}{' '}
            <button onClick={() => handleContactClick(request.email, request.username)}>
              Contact
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestList;
