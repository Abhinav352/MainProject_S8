import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Pic = () => {
  const [userProfile, setUserProfile] = useState(null);

  const fetchProfilePic = useCallback(async () => {
    try {
      const userEmail = JSON.parse(localStorage.getItem('userEmail'));
      const response = await axios.get('http://localhost:5000/image', {
        params: { userEmail },
      });
      const data = response.data;
      setUserProfile(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, []);

  useEffect(() => {
    fetchProfilePic();
  }, [fetchProfilePic]);

  return (
    <div>
      {/* Display the user profile picture */}
      {userProfile && <img
              src={`http://localhost:5000/${userProfile.replace(/\\/g, '/')}`} alt="Profile" />}
    </div>
  );
};

export default Pic;
