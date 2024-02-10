import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsComponent.css';

const NewsComponent = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const apiKey = '38655dcf36c84609b9ce91bf0574fe05'; // Replace with your News API key
    const pageSize = 10; // Number of articles per page
    const disasterKeywords = 'earthquake OR hurricane OR tornado OR flood OR tsunami OR wildfire OR drought OR blizzard OR landslide OR cyclone OR typhoon OR avalanche OR heatwave OR sandstorm OR -Activision OR -OverWatch OR -Midnight';
    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      disasterKeywords
    )}&searchIn=title&pageSize=${pageSize}&apiKey=${apiKey}&language=en`;

    axios
      .get(apiUrl)
      .then(response => {
        setNews(response.data.articles);
        console.log(response.data.articles);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }, []);

  return (
    <div>
      <h2>Disaster News</h2>
      <div className="news-list">
        {news.map((article, index) => (
          <div key={index} className="news-item">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsComponent;
