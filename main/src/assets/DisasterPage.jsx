import React from 'react';
import { useParams } from 'react-router-dom';

const DisasterPage = () => {
  const { id } = useParams();

  if(id=='1')
    {
  return (
    <div>
      <h1>Disaster Details</h1>
      <h2>Disaster ID: {id}</h2>
      {/* Display additional information about the specific disaster */}
    </div>
  );
}
};

export default DisasterPage;