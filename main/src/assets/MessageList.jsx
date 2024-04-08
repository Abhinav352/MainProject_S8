import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import './Messages.css'
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
      <div className='listmessage'>
        <div className='anch'></div>
        <h2>Recent Chats</h2>
        <ul className='messageli'>
          {userRooms.map((room) => (
            <li key={room.roomId} >
              <Link to={`/chat/${room.roomId}`} onClick={() => handleChatClick(room.roomId)}>
                Chat with {room.user1 === currentUserEmail ? room.userName2 : room.userName1}
                {profilePics[room.roomId] ? (
  <img
    src={`http://localhost:5000/${profilePics[room.roomId].replace(/\\/g, '/')}`}
    alt="Profile"
    style={{
      width: '10px', // Adjust the width as needed
      height: '10px', // Adjust the height as needed
      borderRadius: '50%', // This will make the image round
      objectFit: 'cover', // This will ensure the image covers the entire space
    }}
  />
) : (
  <img
    src="data:image/jpeg;base64,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" // Replace 'default-profile-pic.jpg' with the path to your default profile picture
    alt="Default Profile"
    style={{
      width: '10px', // Adjust the width as needed
      height: '10px', // Adjust the height as needed
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
