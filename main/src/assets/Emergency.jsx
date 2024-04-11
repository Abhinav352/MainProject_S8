import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../App';
import { useContext } from 'react';
import './Emergency2.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
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
      <div className='emergency-list'>
        <div className='anch'></div>
        <h2 className='emergency-hed'>Emergency List</h2>
        <div className='emergency-par'>
        <p > <i className='fa-solid fa-location-dot' />&nbsp;&nbsp;&nbsp; Latitude <span style={{ color: 'red' }}> {userLocation.latitude}&nbsp;&nbsp;</span> Longitude<span style={{ color: 'red' }}> {userLocation.longitude}</span></p>
        </div>
         
        <div className='table-contain' id='table-contain'>
        <div className='table-conte'>
              <table>
      
      <thead>
        <tr>
          <th>Latitude:</th>
          <th>Longitude:</th>
          <th>State</th>
          <th>Country</th>
          <th>Distance</th>
          <th>Map</th>
          </tr>
          </thead>
      <tbody>
      {emergency.map((emergency) => (
          <tr key={emergency._id}>
            <td>{emergency.latitude}</td>
            <td>{emergency.longitude}</td>
            <td>{emergency.state}</td>
            <td>{emergency.country}</td>
            <td>{calculateDistance(userLocation.latitude, userLocation.longitude, emergency.latitude, emergency.longitude).toFixed(2)} km</td>
            <td><button id= 'buito' onClick={() => handleShowMap(emergency.latitude, emergency.longitude)} className='emergency-show'>
              Show Map
            </button></td>
          </tr>
          ))}
      </tbody>
              
              
           
            </table>
           </div>
           </div>
      
       
        
      </div>
    );
  }
}
else{
  return(navigate(`/Login`));
}
};

export default Emergency;