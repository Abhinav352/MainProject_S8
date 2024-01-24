import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Messages = () => {
  const [userRooms, setUserRooms] = useState([]);
  const currentUserEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rooms/${currentUserEmail}`);
        setUserRooms(response.data);
      } catch (error) {
        console.error('Error fetching user rooms:', error.message);
      }
    };

    fetchUserRooms();
  }, [currentUserEmail]);

  const handleChatClick = (roomId) => {
    // Navigate to the corresponding Chat component when a chat is clicked
    navigate(`/chat/${roomId}`);
  };

  return (
    <div>
      <h2>Recent Chats</h2>
      <ul>
        {userRooms.map((room) => (
          <li key={room.roomId}>
            <Link to={`/chat/${room.roomId}`} onClick={() => handleChatClick(room.roomId)}>
              Chat with {room.user1} and {room.user2}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;