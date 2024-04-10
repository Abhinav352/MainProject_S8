import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OtherProf.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhoneVolume , faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { authContext } from '../App';

const OtherProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    // Assuming you have defined authContext elsewhere
    const [authState,setAuthState] = useContext(authContext);
    const navigate = useNavigate();
    const { userEmail } = useParams();

    const fetchProfileData = useCallback(async () => {
        try {
          console.log(userEmail);
          const response = await axios.get(`http://localhost:5000/Profile/${JSON.parse(userEmail)}`);
          const data = response.data;
          setUserProfile(data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }, [userEmail]);
  
    useEffect(() => {
      fetchProfileData();
    }, [fetchProfileData]);
  
    if(authState) {
      return (
        <div id='profil_containe'>
      <div className='anch'></div>
      
       <div id='profile_cont_containe'>
       <div className="back-button-container">
        <button onClick={() => navigate(-1)} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} size='2xl'/> 
        </button>
      </div>
        {userProfile ? (
          <div >
            {/* Display profile picture if available */}
            {userProfile.profilePic ? (
              <img
                src={`http://localhost:5000/${userProfile.profilePic.replace(/\\/g, '/')}`}
                alt={`Profile of ${userProfile.firstName} ${userProfile.lastName}`}
                style={{border:'2px ',boxShadow:'0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2), 0 0 25px rgba(255, 255, 255, 0.1)'}}
                className='profile-pictur'
                
              />
            ) : (
              <img src="/defco9.png" alt="Default Profile Picture" className="profile-pictur" />
            )}
            
            <p className='prof_nam'> {`${userProfile.firstName} ${userProfile.lastName}`}</p>
            <p className='prof_typ'>{userProfile.userType}</p>
            <div className='prof_detai'>
            <p className='prof_contac'>Contact Details</p>
            <div className='prof_de'>
            <p><FontAwesomeIcon icon={faEnvelope} /> &nbsp; {userProfile.userEmail}</p>
            
            <p><FontAwesomeIcon icon={faPhoneVolume} /> &nbsp; {userProfile.number}</p>
            </div>
            </div>
            {/* Add more fields as needed */}
          </div>
        ) : (
          <p>Loading user profile...</p>
        )}
        
       
      </div>
      </div>
    );}
};

export default OtherProfile;