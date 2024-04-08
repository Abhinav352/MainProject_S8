import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { authContext } from '../App';
import { useContext } from 'react';

const Messages = () => {
  const [userRooms, setUserRooms] = useState([]);
  const [profilePics, setProfilePics] = useState({}); // State to store profile pictures
  const currentUserEmail = localStorage.getItem('userEmail');
  const currentUserName = localStorage.getItem('userName');
  const navigate = useNavigate();
  const [authState, setAuthState] = useContext(authContext);

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

  useEffect(() => {
    const fetchProfilePics = async () => {
      try {
        const pics = {};
        for (const room of userRooms) {
          const response = await axios.get('http://localhost:5000/image', {
            params: { userEmail: room.user1 === currentUserEmail ? JSON.parse(room.user2) : JSON.parse(room.user1) },
          });
          pics[room.roomId] = response.data; // Store profile picture data in the state
        }
        setProfilePics(pics);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchProfilePics();
  }, [currentUserEmail, userRooms]);

  const handleChatClick = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  if (authState) {
    return (
      <div>
        <h2>Recent Chats</h2>
        <ul>
          {userRooms.map((room) => (
            <li key={room.roomId}>
              <Link to={`/chat/${room.roomId}`} onClick={() => handleChatClick(room.roomId)}>
                Chat with {room.user1 === currentUserEmail ? room.userName2 : room.userName1}
                {profilePics[room.roomId] ? (
  <img
    src={`http://localhost:5000/${profilePics[room.roomId].replace(/\\/g, '/')}`}
    alt="Profile"
    style={{
      width: '50px', // Adjust the width as needed
      height: '50px', // Adjust the height as needed
      borderRadius: '50%', // This will make the image round
      objectFit: 'cover', // This will ensure the image covers the entire space
    }}
  />
) : (
  <img
    src="/profile_desk.jpg"
    alt="Default Profile"
    style={{
      width: '50px', // Adjust the width as needed
      height: '50px', // Adjust the height as needed
      borderRadius: '50%', // This will make the image round
      objectFit: 'cover', // This will ensure the image covers the entire space
    }}
  />
)} {/* Render profile picture if available */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <Navigate to="/Login" />;
  }
};

export default Messages;
