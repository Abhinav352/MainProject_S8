import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      const userEmail = JSON.parse(localStorage.getItem('userEmail'));
      await axios.post(`http://localhost:5000/Profile/upload/${userEmail}`, formData);

      // Fetch user profile data again after successful upload
      fetchProfileData();
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {userProfile ? (
        <div>
          <p>Email: {userProfile.userEmail}</p>
          <p>First Name: {userProfile.firstName}</p>
          <p>Last Name: {userProfile.lastName}</p>
          <p>User Type: {userProfile.userType}</p>
          
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

          {/* File input for profile picture */}
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload Profile Picture</button>

          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;