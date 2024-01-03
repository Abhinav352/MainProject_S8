import React, { useState, useEffect } from 'react';

const VolunteerDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests from the backend when the component mounts
    // This can be done using the fetch API or a library like axios
    // Update the requests state with the fetched data
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-requests', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer your-volunteer-token', // Replace with the volunteer's token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRequests(data.requests);
        } else {
          console.error('Failed to fetch requests');
        }
      } catch (error) {
        console.error('Error during request fetching:', error);
      }
    };

    fetchRequests();
  }, []); // Ensure the effect runs only once when the component mounts

  const handleFulfillRequest = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:5000/fulfill-request/${requestId}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer your-volunteer-token', // Replace with the volunteer's token
        },
      });

      if (response.ok) {
        // Request fulfilled successfully
        console.log('Request fulfilled successfully');
        // Optionally, you can update the local state to reflect the change
      } else {
        // Handle request fulfillment failure
        console.error('Failed to fulfill request');
      }
    } catch (error) {
      console.error('Error during request fulfillment:', error);
    }
  };

  return (
    <div>
      <h2>Volunteer Dashboard</h2>
      <div>
        {requests.map((request) => (
          <div key={request.id}>
            <p>Item Requested: {request.itemRequested}</p>
            <p>User Email: {request.userEmail}</p>
            <img src={request.userProfilePic} alt="Profile" />
            <button onClick={() => handleFulfillRequest(request.id)}>Fulfill Request</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerDashboard;