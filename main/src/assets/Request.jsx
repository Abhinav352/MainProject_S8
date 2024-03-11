// RequestList.js
import React, { useState } from 'react';
import axios from 'axios';
import './Req.css';

const RequestPage = () => {
  const [itemType, setItemType] = useState('');
  const [quantity, setQuantity] = useState('');
  const username=localStorage.getItem("userName");
  const email=localStorage.getItem("userEmail")

  
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
        email,
      });

      console.log('Request submitted successfully');
    } catch (error) {
      console.error('Error submitting request:', error.message);
    }
  };

  return (
    <div className='head3'>
      <h2>Request Page</h2>
      <form onSubmit={handleRequestSubmit}>
        
        <div className='input-item'>
        <label>
          Item Type :</label>
          <input type="text" value={itemType} onChange={handleItemTypeChange} />
        </div>
        <br />
        
        <div className='input-quantity'> <label>
          Quantity :</label>
          <input type="number" value={quantity} onChange={handleQuantityChange} />
        </div>
        <br />
        
        <div className='input-sub'><button type="submit">Submit Request</button></div>
      </form>
    </div>
  );
};

export default RequestPage;