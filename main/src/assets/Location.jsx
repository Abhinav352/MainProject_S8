import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Loc.css'
const Location = () => {
  
        const [userLocation, setUserLocation] = useState({ latitude: '', longitude: '' });
        const [disasterData, setDisasterData] = useState([]);
        const handleInputChange = (event) => {
          const { name, value } = event.target;
          setUserLocation({ ...userLocation, [name]: value });
        };
      
        const handleFetchData = async () => {
          try {
            const apiKey = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjZDhoWXJtTUxpa1RGTUNaa0NGY1lxOTZPWm9hRE1LajZua2gza18wZ0FRIn0.eyJleHAiOjE3MDY3MTYwOTEsImlhdCI6MTcwNjQ1Njg5MSwianRpIjoiODkxYTMyNGUtOThhMS00MGYyLTk3YjEtZmE1MmRhZTk5ZDYwIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hazAxLmtvbnR1ci5pby9hdXRoL3JlYWxtcy9rb250dXIiLCJhdWQiOlsiZXZlbnQtYXBpIiwiYWNjb3VudCJdLCJzdWIiOiJmOmIzMzVlOGJhLTIxZWEtNDMyZS04NWJmLWM3OGM1YmU4MTMxZTphYmhpbmF2MDI5OEBnbWFpbC5jb20iLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJrb250dXJfcGxhdGZvcm0iLCJzZXNzaW9uX3N0YXRlIjoiZTNlZGIzYmQtMTFiYy00MmUzLWFhZGYtOGMwNDRmNDlmODgzIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3Byb2QtZGlzYXN0ZXItbmluamEua29udHVybGFicy5jb20iLCJodHRwczovL2Rpc2FzdGVyLm5pbmphIiwiaHR0cHM6Ly9hcHBzLmtvbnR1ci5pbyJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIkVWRU5UQVBJX3JlYWQ6ZmVlZDprb250dXItcHVibGljIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZXZlbnQtYXBpIjp7InJvbGVzIjpbInJlYWQ6ZmVlZDprb250dXItcHVibGljIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiJlM2VkYjNiZC0xMWJjLTQyZTMtYWFkZi04YzA0NGY0OWY4ODMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkFiaGluYXYgTmFpciIsInByZWZlcnJlZF91c2VybmFtZSI6ImFiaGluYXYwMjk4QGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJBYmhpbmF2IE5haXIiLCJmYW1pbHlfbmFtZSI6IiIsImVtYWlsIjoiYWJoaW5hdjAyOThAZ21haWwuY29tIiwidXNlcm5hbWUiOiJhYmhpbmF2MDI5OEBnbWFpbC5jb20ifQ.TNJeOZeZjn1DSe2qxnxooB8JELiDT6u69ZqcGSjbNSY4OP2i5alSqDW6_M6UCYE11UE0lE4a0e6_jDyyEuiou6xIJzUGBf8rPuUU0vjZ9ZzRGeJ4oBGUG2oDHWSam7tmlBLvzPR1UYlm5IzXipjGdOdiiX77lzkjGkOg8lFluKwQ7ghvWoAB14b37v8jPBD6PLoIEJue2RSCPPgeOXHFAtKqQGkEG-UAQ0-0KS3qf4W1fhUKyqFxCa9T8HIl2v0JrSxUGuGehQhzIlR8GqSr8W69Yn5FVWDhS8XCU_sVYzQ5ss0UofsWCInQcgLvDYkxnHNKAs-j72C3kmsO3v_hzQ'; // Replace with your actual API key
      
            const currentDate = new Date();
          currentDate.setDate(currentDate.getDate()-1); // Subtract one day
          const userDatetime = currentDate.toISOString();
      
      
          const response = await fetch(`https://apps.kontur.io/events/v1/?feed=kontur-public&after=${userDatetime}`, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          });
      
          console.log('Response Status:', response.status);
          console.log('Response Headers:', response.headers);
      
          if (response.status === 204) {
            console.log('No content in the response.');
            return;
          }
      
          const data = await response.json();
          console.log('Response Data:', data);
      
          setDisasterData(data.data);
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
        useEffect(() => {
          // Fetch data when the component mounts
          handleFetchData();
        }, []);
      
        const checkIfUserInAnyDisasterArea = async () => {
          const { latitude, longitude } = userLocation;
          
          for (const event of disasterData) {
            const bbox = event.bbox;
            const userInCurrentDisasterArea = isPointInBoundingBox(latitude, longitude, bbox);
      
            if (userInCurrentDisasterArea) {
              console.log(`User is in the disaster area of ${event.location}`);
              console.log(userLocation);
              
              try {
                // Make a POST request to the backend endpoint
                await axios.post('http://localhost:5000/emergency', {
                  latitude,
                  longitude
                });
          
                console.log('Request submitted successfully');
              } catch (error) {
                console.error('Error submitting request:', error.message);
              }
              // Handle the case where the user is in a disaster area
              return;
            }
          }
      
          console.log('User is not in any of the disaster areas.');
          console.log(userLocation);
          // Continue with your application logic
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
          // Fetch data when the component mounts
          handleFetchData();
        }, []);
      
        useEffect(() => {
          // Trigger disaster check when userLocation changes
          if (userLocation.latitude && userLocation.longitude) {
            checkIfUserInAnyDisasterArea();
          }
        }, [userLocation]);
      
        return (
         
                                                                                 
          <div className="container"> {/* Use class names directly */}
          {/* Display current location */}
          
    
          {/* Button to get current location and check if in disaster area */}
          <button
            className="checkButton" 
            onClick={() => {
              getCurrentLocation();
            }}
          >
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              HELLO
              </span>
          </button>
    
          {/* Your React component UI goes here */}
          {/* You can render the fetched disaster data, display warnings, etc. */}
        </div>
       
        );
      };
      

export default Location