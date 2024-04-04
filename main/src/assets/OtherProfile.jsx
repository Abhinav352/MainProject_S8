import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
        <div>
          <h2>User Profile</h2>
          {userProfile ? (
            <div>
              <p>Email: {userProfile.userEmail}</p>
              <p>First Name: {userProfile.firstName}</p>
              <p>Last Name: {userProfile.lastName}</p>
              <p>User Type: {userProfile.userType}</p>
              <p>Phone Number: {userProfile.number}</p>
              
              {/* Display profile picture if available */}
              {userProfile.profilePic ? (
                <img
                  src={`http://localhost:5000/${userProfile.profilePic.replace(/\\/g, '/')}`}
                  alt={`Profile of ${userProfile.firstName} ${userProfile.lastName}`}
                  style={{ maxWidth: '200px' }}
                />
              ) : (
                <p>No profile picture available</p>
              )}
            </div>
          ) : (
            <p>Loading user profile...</p>
          )}
        </div>
      );
    } else {
      return <Navigate to='/Login' />;
    }
};

export default OtherProfile;