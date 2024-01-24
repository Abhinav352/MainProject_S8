// RequestList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const handleContactClick = async (requesterEmail) => {
    try {
      const currentUserEmail = localStorage.getItem('userEmail');
      const response = await axios.post('http://localhost:5000/create-chat-room', {
        requesterEmail,
        currentUserEmail,
      });

      const room = response.data.room;
      navigate(`/chat/${room}`);
    } catch (error) {
      console.error('Error creating chat room:', error.message);
    }
  };

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

  return (
    <div>
      <h2>Requests List</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <strong>Item Type:</strong> {request.itemType},{' '}
            <strong>Quantity:</strong> {request.quantity},{' '}
            <strong>Username:</strong> {request.username},{' '}
            <strong>Email:</strong> {request.email}{' '}
            <button onClick={() => handleContactClick(request.email)}>Contact</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestList;