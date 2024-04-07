import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './InitialResponse.css';

const InitialResponse = () => {
  const navigate = useNavigate();

  // Dummy data for disasters
  const disasters = [
    {
      id: 1,
      name: "Earthquake",
      imageUrl: "/src/Images/Earthquake.jpg"
    },
    {
      id: 2,
      name: "Flood",
      imageUrl: "/src/Images/Flood.jpg"
    },
    {
      id: 3,
      name: "Wildfire",
      imageUrl: "/src/Images/WildFire.jpg"
    },
    {
      id: 4,
      name: "Tornado",
      imageUrl: "/src/Images/Tornado.jpg"
    },
    {
      id: 5,
      name: "Hurricane",
      imageUrl: "/src/Images/Hurricane.jpg"
    },
    {
      id: 6,
      name: "Volcano",
      imageUrl: "/src/Images/Volcano.jpg"
    },
    {
      id: 7,
      name: "Tsunami",
      imageUrl: "/src/Images/Tsunami.webp"
    }
  ];

  const handleCardClick = (disasterId) => {
    navigate(`/disaster/${disasterId}`);
  };

  return (
    <div className="disaster-page">
      <h1>Disasters</h1>
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