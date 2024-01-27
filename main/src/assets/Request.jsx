// RequestList.js
import React, { useState } from 'react';
import axios from 'axios';

const RequestPage = () => {
  const [itemType, setItemType] = useState('');
  const [quantity, setQuantity] = useState('');
  const username=localStorage.getItem("userName");

  
  const handleItemTypeChange = (e) => {
    setItemType(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };


  const handleRequestSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend endpoint
      await axios.post('http://localhost:5000/requests', {
        itemType,
        quantity: parseInt(quantity, 10),
        username,
      });

      console.log('Request submitted successfully');
    } catch (error) {
      console.error('Error submitting request:', error.message);
    }
  };

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
        
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestPage;