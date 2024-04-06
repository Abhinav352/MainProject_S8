import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhoneVolume  } from '@fortawesome/free-solid-svg-icons';
import { useNavigate,Navigate } from 'react-router-dom';
import { authContext } from '../App';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUserPen,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import defaultProfilePic from "/defco9.png";

<style>
@import url('https://fonts.googleapis.com/css2?family=Caudex:ital,wght@0,400;0,700;1,400;1,700&display=swap')
</style>

  const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  const [authState,setAuthState] = useContext(authContext);
  const navigate = useNavigate();

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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      const userEmail = JSON.parse(localStorage.getItem('userEmail'));
      await axios.post(`http://localhost:5000/Profile/upload/${userEmail}`, formData);
      // Fetch user profile data again after successful upload
      fetchProfileData();
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  const handleLogout = ()=>{
    localStorage.clear()
    localStorage.setItem ("authenticated",false)
    setAuthState(false)
    navigate(`/Login`)
  }
  const EditProfilePicture = ({ handleFileChange }) => {
    return (
      <label htmlFor="file-input" className="edit-profile-picture">
        <FontAwesomeIcon icon={faUserPen} />
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="file-input"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </label>
    );
  };

  if (authState) {
    return (
      <div id='profile_container'>
      <div className='anch'></div>
      <button className='log_mob' onClick={handleLogout}><FontAwesomeIcon icon={faArrowRightFromBracket} size="xl"/></button>
       <div id='profile_cont_container'>
        {userProfile ? (
          <div >
            {/* Display profile picture if available */}
            {userProfile.profilePic ? (
              <img
                src={`http://localhost:5000/${userProfile.profilePic.replace(/\\/g, '/')}`}
                alt={`Profile of ${userProfile.firstName} ${userProfile.lastName}`}
                style={{border:'2px ',boxShadow:'0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2), 0 0 25px rgba(255, 255, 255, 0.1)'}}
                className='profile-picture'
                
              />
            ) : (
              <img src={defaultProfilePic} alt="Default Profile Picture" className="profile-picture" />
            )}
            <div className='edit-button-container'>
            {/* File input for profile picture */}
            <EditProfilePicture handleFileChange={handleFileChange} />
            </div >
            <p className='prof_name'> {`${userProfile.firstName} ${userProfile.lastName}`}</p>
            <p className='prof_type'>{userProfile.userType}</p>
            <div className='prof_detail'>
            <p className='prof_contact'>Contact Details</p>
            <div className='prof_det'>
            <p><FontAwesomeIcon icon={faEnvelope} /> &nbsp; {userProfile.userEmail}</p>
            
            <p><FontAwesomeIcon icon={faPhoneVolume} /> &nbsp; +91 {userProfile.number}</p>
            </div>
            </div>
            {/* Add more fields as needed */}
          </div>
        ) : (
          <p>Loading user profile...</p>
        )}
        <button className='log_desk' onClick={handleLogout}>LogOut</button>
       
      </div>
      </div>
    );
  } else {
    return <Navigate to="/Login" />;
  }
};

export default Profile;