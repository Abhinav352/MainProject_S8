import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Location = () => {
  
  
        const [userLocation, setUserLocation] = useState({ latitude: '', longitude: '' });
        const [disasterData, setDisasterData] = useState([]);
        const handleInputChange = (event) => {
          const { name, value } = event.target;
          setUserLocation({ ...userLocation, [name]: value });
        };
      
        const handleFetchData = async () => {
          try {
            const apiKey = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjZDhoWXJtTUxpa1RGTUNaa0NGY1lxOTZPWm9hRE1LajZua2gza18wZ0FRIn0.eyJleHAiOjE3MDQ0NjAwNDMsImlhdCI6MTcwNDIwMDg0MywianRpIjoiZWMxNWNkNDctMDE4Zi00NWMyLWI5OWEtM2E4MDI1MmY3Yzk5IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hazAxLmtvbnR1ci5pby9hdXRoL3JlYWxtcy9rb250dXIiLCJhdWQiOlsiZXZlbnQtYXBpIiwiYWNjb3VudCJdLCJzdWIiOiJmOmIzMzVlOGJhLTIxZWEtNDMyZS04NWJmLWM3OGM1YmU4MTMxZTphYmhpbmF2MDI5OEBnbWFpbC5jb20iLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJrb250dXJfcGxhdGZvcm0iLCJzZXNzaW9uX3N0YXRlIjoiZjc3NGQ5NDQtNTdjNC00MTRkLWFlNTYtM2U3MTUwY2YyYjQ0IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3Byb2QtZGlzYXN0ZXItbmluamEua29udHVybGFicy5jb20iLCJodHRwczovL2Rpc2FzdGVyLm5pbmphIiwiaHR0cHM6Ly9hcHBzLmtvbnR1ci5pbyJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIkVWRU5UQVBJX3JlYWQ6ZmVlZDprb250dXItcHVibGljIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZXZlbnQtYXBpIjp7InJvbGVzIjpbInJlYWQ6ZmVlZDprb250dXItcHVibGljIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiJmNzc0ZDk0NC01N2M0LTQxNGQtYWU1Ni0zZTcxNTBjZjJiNDQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkFiaGluYXYgTmFpciIsInByZWZlcnJlZF91c2VybmFtZSI6ImFiaGluYXYwMjk4QGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJBYmhpbmF2IE5haXIiLCJmYW1pbHlfbmFtZSI6IiIsImVtYWlsIjoiYWJoaW5hdjAyOThAZ21haWwuY29tIiwidXNlcm5hbWUiOiJhYmhpbmF2MDI5OEBnbWFpbC5jb20ifQ.GRpHN7djz1GBDoQDhoojc_r3g2-5By0v4nTBlJ-MsU3K8q9EFK53Mew3DTKzeHBvHq-m4bTig2hF7zssCDxncgV0m9m-EaJYvsdQdz5wcyBgc1Qr-xSdc5dLDEV-tkJq3Z3npTDKzh-Dj-L_I3gvmu_1g2JXB8xyDrDy5jYu-eS3IEDe-jCel-xkrgsh--QSQeiIg_3-gzmkSN1HGQ9l76nVBzVuelHU3RASu-3D2CmFP0ZwHlS7VT07cvJWBZJICodqc_QtjKgtu7eZF0B1KiqecacrQWc09v_MZQDPI6NhfxusGdxdU3CpVk2tbBNL0sFY6t_4uiRZdbkO3p4rgQ'; // Replace with your actual API key
      
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
        return (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {/* Input fields for latitude and longitude */}
          <label>
            Latitude:
            <input type="text" name="latitude" value={userLocation.latitude} onChange={handleInputChange} />
          </label>
          <label>
            Longitude:
            <input type="text" name="longitude" value={userLocation.longitude} onChange={handleInputChange} />
          </label>
    
          {/* Button to check if the coordinates are in any disaster area */}
          <button
            style={{
              borderRadius: '50%', // Make the button round
              padding: '20px', // Adjust padding as needed
              fontSize: '16px', // Adjust font size as needed
              cursor: 'pointer', // Add a pointer cursor for better usability
              width: '50%', // Make the button cover half of the page
            }}
            onClick={checkIfUserInAnyDisasterArea}
          >
            Check
          </button>
    
          {/* Your React component UI goes here */}
          {/* You can render the fetched disaster data, display warnings, etc. */}
        </div>
        );
      };
      
   
      

export default Location