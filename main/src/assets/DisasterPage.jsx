import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DisasterPage = () => {
  const { id } = useParams();
  const [disaster, setDisaster] = useState(null);

  useEffect(() => {
    const fetchDisasterData = async () => {
      try {
        // Replace this with your actual data fetching logic
        // For example, you could use an API call or access a local data source
        const disasterData = await getDisasterData(id);
        setDisaster(disasterData);
      } catch (error) {
        console.error('Error fetching disaster data:', error);
      }
    };
    fetchDisasterData();
  }, [id]);

  const getDisasterData = async (disasterId) => {
    // Replace this with your actual data fetching logic
    switch (disasterId) {
      case '1':
        return {
          id: '1',
          name: 'Earthquake',
          description: 'A powerful earthquake struck the region, causing significant damage and loss of life.',
          image: '/src/Images/Earthquake.jpg',
        };
      case '2':
        return {
          id: '2',
          name: 'Flood',
          description: 'Heavy rainfall caused severe flooding in the affected areas.',
          image: '/src/Images/Flood.jpg',
        };
      // Add more cases for different disaster IDs
      default:
        return null;
    }
  };

  if (!disaster) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{disaster.name}</h1>
      <img src={disaster.image} alt={disaster.name} />
      <p>{disaster.description}</p>
      {/* Add more disaster details here */}
    </div>
  );
};

export default DisasterPage;