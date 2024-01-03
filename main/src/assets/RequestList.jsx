import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate();

  if(userType==='"non-volunteer"')
  {
    useEffect(()=>{

   
    navigate('/req');
})
  }
  else
{
  useEffect(() => {
    // Fetch requests from the backend when the component mounts
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error.message);
      }
    };

    fetchRequests();
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return (
    <div>
      <h2>Requests List</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <strong>Item Type:</strong> {request.itemType},{' '}
            <strong>Quantity:</strong> {request.quantity},{' '}
            <strong>Username:</strong> {request.username},{' '}
            <strong>Email:</strong> {request.email}

          </li>
        ))}
      </ul>
    </div>
  );
        
        
};
}
export default RequestList;