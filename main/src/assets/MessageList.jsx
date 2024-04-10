import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import './Messages.css';
import { authContext } from '../App';

const Messages = () => {
  const [userRooms, setUserRooms] = useState([]);
  const [profilePics, setProfilePics] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const currentUserEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();
  const [authState] = useContext(authContext);

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
          pics[room.roomId] = response.data;
        }
        setProfilePics(pics);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchProfilePics();
  }, [currentUserEmail, userRooms]);

  const fetchProfileData = useCallback(async () => {
    try {
      const userEmail = JSON.parse(localStorage.getItem('userEmail'));
      const response = await axios.get('http://localhost:5000/Profile', {
        params: { userEmail },
      });
      const data = response.data;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleChatClick = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  if (authState) {
    return (
      <div className='listmessage'>
        <div className='anch'></div>
        {userProfile && (
          <div className="profile-container">
            {/* Display profile picture if available */}
            {userProfile.profilePic ? (
              <img
                src={`http://localhost:5000/${userProfile.profilePic.replace(/\\/g, '/')}`}
                alt={`Profile of ${userProfile.firstName} ${userProfile.lastName}`}
                className='profile-picture'
              />
            ) : (
              <img src="/default-profile.jpg" alt="Default Profile Picture" className="profile-picture" />
            )}
            <h1>{userProfile.firstName}</h1>
            <div className='anch'></div>
            <h2>Recent Chats</h2>
            <ul className='messageli'>
              {userRooms.map((room) => (
                <li key={room.roomId} >
                  <Link to={`/chat/${room.roomId}`} onClick={() => handleChatClick(room.roomId)}>
                    Chat with {room.user1 === currentUserEmail ? JSON.parse(room.userName2) : JSON.parse(room.userName1)}
                    {profilePics[room.roomId] ? (
  <img
    src={`http://localhost:5000/${profilePics[room.roomId].replace(/\\/g, '/')}`}
    alt="Profile"
    className='profile-picture-small'
  />
) : (
  <img
    src="/defco9.png" 
    alt="Default Profile"
    className='profile-picture-small'
  />
)}
                
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  } else {
    return <Navigate to="/Login" />;
  }
};

export default Messages;