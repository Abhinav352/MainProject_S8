import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

import '@fortawesome/fontawesome-free/css/all.min.css';
import { authContext } from '../App';
import './css/Messages.css';
import defaultProfilePic from "/defco9.png";
import { Dialog } from '@mui/material';

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
    if(userRooms.length > 0){
    return (
      <div className="messagy-container">
        
      <nav className="messagy-navbar">
        <a href="/">
        <button className="back-button" >
          <i className="fas fa-arrow-left"></i>
        </button>
        </a>
      
     
        {userProfile && (
          <div className="profile-info">
            {userProfile.profilePic ? (
              <img
                src={`http://localhost:5000/${userProfile.profilePic.replace(/\\/g, '/')}`}
                alt={`Profile of ${userProfile.firstName} ${userProfile.lastName}`}
             
                className="profile-pictur"
              />
            ) : (
              <img src="/default-profile.jpg" alt="Default Profile Picture" className="profile-pictur" />
            )}
            <h1>{userProfile.firstName}</h1>
            
          </div>
        )}
        </nav>
        <div className="messagy-content">
          <p className='messagy-p'>Start a chat....</p>
        <ul className="messagy-list">
          {userRooms.map((room) => (
            <li key={room.roomId} className="messagy-item">
              <Link to={`/chat/${room.roomId}`} onClick={() => handleChatClick(room.roomId)} className="messagy-link">
                <div className="user-info">
                  {profilePics[room.roomId] ? (
                    <img
                      src={`http://localhost:5000/${profilePics[room.roomId].replace(/\\/g, '/')}`}
                      alt="Profile"
                      className="profile-picture-smally"
                    />
                  ) : (
                    <img src={defaultProfilePic} alt="Default Profile" className="profile-picture-smally" />
                  )}
                  <span>{room.user1 === currentUserEmail ? JSON.parse(room.userName2) : JSON.parse(room.userName1)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
    }
    else{
      return (
        <div className='messageno'>
             <a href="/">
        <button className="back-butto" >
          <i className="fas fa-arrow-left"></i>
        </button>
        </a>
          
        
        <h1 className='No-Messages'>No Messages</h1>
        
        </div>
      );
    }
     
    
  } else {
    return <Navigate to="/Login" />;
  }
};

export default Messages;