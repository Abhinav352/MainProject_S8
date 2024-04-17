import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Loc.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments  } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from './DropDownMenu';
import Modal from 'react-modal';
import {Link} from 'react-scroll';
import dwnbutton from '../Images/arrow.png'
import wall from '../Images/loc-wall.jpg'


const Location = () => {
  const [userLocation, setUserLocation] = useState({ latitude: '', longitude: '' });
  const [disasterData, setDisasterData] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [userInDisasterArea, setUserInDisasterArea] = useState(false);
  const [checkedornot, setcheckedornot,] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [notInDisasterModal, setNotInDisasterModal] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserLocation({ ...userLocation, [name]: value });
  };

  const fetchAccessToken = async () => {
    try {
      const response = await axios.post('https://keycloak01.kontur.io/auth/realms/kontur/protocol/openid-connect/token', new URLSearchParams({
        client_id: 'kontur_platform',
        username: 'abhinav0298@gmail.com',
        password: '0096491UE5nlInx1M5',
        grant_type: 'password',
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, refresh_token } = response.data;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
    } catch (error) {
      console.error('Error fetching access token:', error.message);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('https://keycloak01.kontur.io/auth/realms/kontur/protocol/openid-connect/token', new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, refresh_token } = response.data;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
    } catch (error) {
      console.error('Error refreshing access token:', error.message);
      // If the refresh token is invalid or expired, fetch a new access token
      fetchAccessToken();
    }
  };


  const handleFetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/Location/${accessToken}`);
      setDisasterData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching Data:', error.message);
    }
  };

  useEffect(() => {
    // Fetch access token when the component mounts
    fetchAccessToken();

    // Set up a timer to refresh the access token before it expires
    const intervalId = setInterval(() => {
      refreshAccessToken();
    }, 172800000); // Refresh every 2 days (2 * 24 * 60 * 60 * 1000 milliseconds)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Fetch data when the access token changes
    if (accessToken) {
      handleFetchData();
    }
  }, [accessToken]);

  const checkIfUserInAnyDisasterArea = async () => {
  setcheckedornot(true);
    const { latitude, longitude } = userLocation;
    let userInCurrentDisasterArea = false; 

    for (const event of disasterData) {
      const bbox = event.bbox;
      const userInCurrentDisasterArea = isPointInBoundingBox(latitude, longitude, bbox);

      if (userInCurrentDisasterArea) {
        setModalIsOpen(true);
        console.log(userLocation);

        try {
          // Fetch city and country information using Nominatim API
          const nominatimResponse = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const { state, country } = nominatimResponse.data.address;
          console.log(country)
          console.log(state)


          // Make a POST request to the backend endpoint with latitude, longitude, city, and country
          await axios.post('http://localhost:5000/emergency', {
            latitude,
            longitude,
            country,
            state
          });

          console.log('Request submitted successfully');
        } catch (error) {
          console.error('Error submitting request:', error.message);
        }
        // Handle the case where the user is in a disaster area
        break;

      }
    }
    if (!userInCurrentDisasterArea) {
      setNotInDisasterModal(true);
    console.log(userLocation);
  }
  };

  const isPointInBoundingBox = (lat, lon, bbox) => {
    const [minLon, minLat, maxLon, maxLat] = bbox;
    return lon >= minLon && lon <= maxLon && lat >= minLat && lat <= maxLat;
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude: latitude.toString(), longitude: longitude.toString() });
        },
        (error) => {
          console.error('Error getting current location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    // Trigger disaster check when userLocation changes
    if (userLocation.latitude && userLocation.longitude) {
      checkIfUserInAnyDisasterArea();
    }
  }, [userLocation]);


  return (
    <>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Disaster Area Alert"
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none',
          width: '80%',
          maxWidth: '400px',
          height: '80%',
          maxHeight: '300px',
          '@media (maxWidth: 767px)': {
            maxWidth: '300px',
            maxHeight: '300px',
          },
        },
      }}
    >
      <h2 className='popupmessag'>Assistance sent.. <br /> SOS detected!</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => setModalIsOpen(false)}
          style={{
            backgroundColor: '#3598f0',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            '@media (maxWidth: 767px)': {
              width: '100%',
            },
          }}
        >
          Close
        </button>
      </div>
    </Modal>
    <Modal
      isOpen={notInDisasterModal}
      onRequestClose={() => setNotInDisasterModal(false)}
      contentLabel="Not in Disaster Area"
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
         
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none',
          width: '80%',
          maxWidth: '400px',
          height: '80%',
          maxHeight: '300px',
          '@media (maxWidth: 767px)': {
            maxWidth: '300px',
            maxHeight: '300px',
          },
           
          
          
        },
      }}
    >
      <h2 className='popupmessage'>Currently you are not in a disaster area!</h2>
      <div style={{ display: 'flex', justifyContent: 'center' ,marginTop:'-30px'}}>
        <button
          onClick={() => setNotInDisasterModal(false)}
          style={{
            backgroundColor: '#3598f0',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            '@media (maxWidth: 767px)': {
              width: '100%',
            },
          }}
        >
          Close
        </button>
      </div>
    </Modal>
      <div className='whole'>
        <div className="sos-container">
          <div className="outer-circle"></div>
            <div className="inner-circle"></div>
              <button
              className="sos-button"
              onClick={() => {
              getCurrentLocation();

              }}
               >
              <span>
              SOS
              </span>
              </button>

        </div>

      </div>

      <div className='wholeM'>
      <DropdownMenu/>
          <div className="sos-container">

            <div className="outer-circle"></div>
              <div className="inner-circle"></div>
                <button
                className="sos-button"
                onClick={() => {
                getCurrentLocation();
                }}
                >
                  <span>
                  SOS
                  </span>
                </button>
                <button className='loc-message'><a href="/Messages"><FontAwesomeIcon icon={faComments}  fontSize={'36px'} color='white' /></a></button>
          </div>

         <div className='loc-spacing'></div>
          </div>

        </>

  );
};

export default Location;
