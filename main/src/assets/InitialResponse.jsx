import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/InitialResponse.css';

const InitialResponse = () => {
  const navigate = useNavigate();

  // Dummy data for disasters
  const disasters = [
    {
      id: 1,
      name: "Earthquake",
      imageUrl: "/src/Images/earth3.jpeg"
    },
    {
      id: 2,
      name: "Flood",
      imageUrl: "/src/Images/flood3.jpeg"
    },
    {
      id: 3,
      name: "Wildfire",
      imageUrl: "/src/Images/fire3.jpeg"
    },
    {
      id: 4,
      name: "Tornado",
      imageUrl: "/src/Images/tornado3.jpeg"
    },
    {
      id: 5,
      name: "Hurricane",
      imageUrl: "/src/Images/hurricane3.jpeg"
    },
    {
      id: 6,
      name: "Volcano",
      imageUrl: "/src/Images/volcano3.jpeg"
    },
    {
      id: 7,
      name: "Tsunami",
      imageUrl: "/src/Images/tsunami3.jpeg"
    }
  ];

  const handleCardClick = (disasterId) => {
    navigate(`/disaster/${disasterId}`);
  };

  return (
    <div className="disaster-page">
      <div className='anch'></div>
      <h1 className='disaster-title'>Disasters</h1>
      <div className="disaster-list">
        {disasters.map((disaster) => (
          <div
            key={disaster.id}
            className="card"
            onClick={() => handleCardClick(disaster.id)}
          >
            <Link to={`/disaster/${disaster.id}`} className="card-link">
              <div className="card-image">
                <img className="small-image" src={disaster.imageUrl} alt={disaster.name} />
              </div>
              <div className="card-content">
                <h3>{disaster.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InitialResponse;