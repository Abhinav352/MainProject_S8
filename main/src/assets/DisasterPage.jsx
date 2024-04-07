import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DisasterPage = () => {
  const { id } = useParams();
  const [disaster, setDisaster] = useState(null);

  useEffect(() => {
    // Fetch the disaster data based on the id parameter
    // You can use an API call or access a local data source
    const fetchDisasterData = async () => {
      try {
        // Replace this with your actual data fetching logic
        const disasterData = {
          id: 1,
          name: 'Earthquake',
          description: 'A powerful earthquake struck the region, causing significant damage and loss of life.',
          image: '/src/Images/Earthquake.jpg',
          // Add any other relevant disaster data here
        };
        setDisaster(disasterData);
      } catch (error) {
        console.error('Error fetching disaster data:', error);
      }
    };
    fetchDisasterData();
  }, [id]);

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