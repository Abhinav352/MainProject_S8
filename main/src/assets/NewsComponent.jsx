import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './NewsComponent.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { authContext } from '../App';
import { useContext } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 


const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [authState, setAuthState] = useContext(authContext);
  
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/News/${currentPage}`);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching News:', error.message);
      }
    };
    fetchNews();
  }, [currentPage]);
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    console.log(currentPage);
    scrollToTop();
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log(currentPage);
      scrollToTop();
    }
  };
  const scrollToTop = () => {
    const newsListContainer = document.querySelector('.news-list');
    newsListContainer.scrollTo({ top: 0, behavior: 'smooth' });
  };

if(authState)
{
  return (
    <div className='newsback'>
      <div id='posi'>
      <h2 id='dis'>Disaster News</h2>
      <div className="news-container">
      <div className="news-list">
        {news.map((article, index) => (
          <div key={index} className="news-item">
          
            <p className='def'>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              For more -&gt;
            </a>
          </div>
        ))} 
        </div>
        
        <div className="pagination">
        
              <button onClick={handlePrevPage} disabled={currentPage === 1} className='prev'>
              <i className="fa-solid fa-arrow-left"></i>
              </button>
              
              <button onClick={handleNextPage} className='next'>
              <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
       
      </div>
      </div>
    </div>
  );
}
else{
  return(<Navigate to='/Login'/>)

 
}
};

export default NewsComponent;