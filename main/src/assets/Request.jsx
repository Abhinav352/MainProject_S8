// RequestList.js
import React, { useState } from 'react';
import axios from 'axios';
import './Req.css';
import { useNavigate,Navigate } from 'react-router-dom';
import { authContext } from '../App';
import { useContext } from 'react';

const RequestPage = () => {
  const [itemType, setItemType] = useState('Medicine');
  const [description, setDescription] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const username=localStorage.getItem("userName");
  const email=localStorage.getItem("userEmail");
  const [authState,setAuthState] = useContext(authContext);
  const navigate = useNavigate();

  
  const handleItemTypeChange = (e) => {
    setItemType(e.target.value);
  };

  const handleDescriptionChange = (e) => {
   const value = e.target.value;
   const words = value.trim().split(/\s+/).length;
   setWordCount(words);

   if(words <= 49){
    setDescription(value);
   }
  };


  const handleRequestSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend endpoint
      await axios.post('http://localhost:5000/requests', {
        itemType,
        description,
        username,
        email,
      });

      console.log('Request submitted successfully');
    } catch (error) {
      console.error('Error submitting request:', error.message);
    }
  };
if(authState)
{
  return (
       <div id='req-form'>  
      <h2>Request</h2>
      <form onSubmit={handleRequestSubmit}>
        
        <div className='form-group'>
        <label htmlFor='material' id='materlabel'>Item Type </label>
       

        <select name="material" id="material" value={itemType} onChange={handleItemTypeChange} >
        <option value="Medicine">Medicine</option>
        <option value="Food">Food</option>
        <option value="Clothes">Clothes</option>
        <option value="Others">Others</option>
        </select>
        
        </div>
        <div id='gapy'></div>
        <div className='form-group'> 
        <label htmlFor='desc' id='desclabel'>Description</label>
        <textarea name="desc" id="desc" placeholder='Enter quantity and related info.....'  value={description} onChange={handleDescriptionChange}></textarea>
        <div id='char-count'>{wordCount} words (Max 50)</div>
        </div>
        <button type="submit" id='subut'>Submit</button>
      </form>
    </div>
  );
}
else{
  return(<Navigate to='/Login'/>)

}
};

export default RequestPage;