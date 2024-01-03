import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Request = () => {
  const [itemType, setItemType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');


  const handleItemTypeChange = (e) => {
    setItemType(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  

  const handleRequestSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend endpoint
      await axios.post('http://localhost:5000/requests', {
        itemType,
        quantity: parseInt(quantity, 10),
        username,
        email
      });

      console.log('Request submitted successfully');
    } catch (error) {
      console.error('Error submitting request:', error.message);
    }
  };
const handlePending= async()=>{
  navigate('/pending')
}
  return (
    <div>
      <h2>Request Page</h2>
      <form onSubmit={handleRequestSubmit}>
        <label>
          Item Type:
          <input type="text" value={itemType} onChange={handleItemTypeChange} />
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={handleQuantityChange} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        
        <button type="submit">Submit Request</button>
      </form>
      <button onClick={handlePending}>Pending Request</button>
    </div>
  );
};

export default Request;