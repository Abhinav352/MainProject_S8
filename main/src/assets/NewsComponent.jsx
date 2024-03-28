import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsComponent.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { authContext } from '../App';
import { useContext } from 'react';

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [authState, setAuthState] = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = '38655dcf36c84609b9ce91bf0574fe05';
    const pageSize = 20;
    const disasterKeywords = 'earthquake OR hurricane OR tornado OR flood OR tsunami OR wildfire OR drought OR blizzard OR landslide OR cyclone OR typhoon OR avalanche OR heatwave OR sandstorm OR -Activision OR -OverWatch OR -Midnight OR -AI OR -putin OR -Diablo';
    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(disasterKeywords)}&searchIn=title&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}&language=en`;

    axios
      .get(apiUrl)
      .then(response => {
        const articlesWithDescription = response.data.articles.filter(article => article.description && article.description.trim() !== '');
        setNews(articlesWithDescription);
        console.log(articlesWithDescription);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (authState) {
    return (
      <div className='newsback'>
        <div id='posi'>
          <h2 id='dis'>Disaster News</h2>
          <div className="news-list">
            {news.map((article, index) => (
              <div key={index} className="news-item">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  For more -&gt;
                </a>
              </div>
            ))}
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous Page
              </button>
              <button onClick={handleNextPage}>Next Page</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to='/Login' />;
  }
};

export default NewsComponent;