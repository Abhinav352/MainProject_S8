import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../App';
import { useContext } from 'react';

const Emergency = () => {
  const [emergency, setEmergency] = useState([]);
  const [userLocation, setUserLocation] = useState({ latitude: '', longitude: '' });
  const userType = localStorage.getItem('userType');
  const [authState,setAuthState] = useContext(authContext);

  
  const navigate = useNavigate();
  console.log(userLocation.latitude,userLocation.longitude);
  useEffect(() => {
    // Fetch user's current location
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting user location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    // Fetch emergency data within 20KM radius
    const fetchEmergencyData = async () => {
      try {
        await fetchUserLocation(); // Fetch user location first

        // Fetch emergency data
        const response = await axios.get('http://localhost:5000/emergency');
        const emergencyData = response.data;

        // Filter data within 20KM radius
        const emergencyWithinRadius = emergencyData.filter((emergency) => {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            emergency.latitude,
            emergency.longitude
          );
          return distance <= 200; // 20KM radius
        });

        setEmergency(emergencyWithinRadius);
      } catch (error) {
        console.error('Error fetching emergency data:', error.message);
      }
    };

    fetchEmergencyData();
  }, [userLocation.latitude, userLocation.longitude]); // Trigger on user location change

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  };
  const handleShowMap = (latitude, longitude) => {
    navigate(`/map/${latitude}/${longitude}`);
  };
  if(authState)
  {
  if (userType === '"non-volunteer"') {
    useEffect(() => {
      navigate('/req');
    }, [navigate]);
    return null; // Render nothing for non-volunteers
  } else {
    return (
      <div>
        <h2>Emergency List</h2>
        <p>User's Location: Latitude {userLocation.latitude}, Longitude {userLocation.longitude}</p>
        <ul>
          {emergency.map((emergency) => (
            <li key={emergency._id}>
              <strong>Latitude:</strong> {emergency.latitude}, <strong>Longitude:</strong>  {emergency.longitude},<strong>State:</strong>{emergency.state},<strong>Country:</strong>{emergency.country},
              <strong>Distance:</strong> {calculateDistance(userLocation.latitude, userLocation.longitude, emergency.latitude, emergency.longitude).toFixed(2)} km,{''}
              <button onClick={() => handleShowMap(emergency.latitude, emergency.longitude)}>
              Show Map
            </button>
            </li>
          ))}
        </ul>
        
      </div>
    );
  }
}
else{
  return(navigate(`/Login`));
}
};

export default Emergency;