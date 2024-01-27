import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  // State to store user profile data
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile data when the component mounts
    const fetchProfileData = async () => {
      try {
        // Assume you have the user's email stored in localStorage
        const userEmail = localStorage.getItem('userEmail');

        // Make a GET request to fetch user profile
        const response = await axios.get('http://localhost:5000/profile', {
          params: { userEmail },
        });

        // Update the state with the user profile data
        const data = response.data;
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfileData();
  }, []); // The empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <h2>User Profile</h2>
      {userProfile ? (
        <div>
          <p>Email: {userProfile.userEmail}</p>
          <p>First Name: {userProfile.firstName}</p>
          <p>Last Name: {userProfile.lastName}</p>
          <p>User Type: {userProfile.userType}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
