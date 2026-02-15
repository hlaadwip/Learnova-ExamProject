import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { fetchCourses } from '../services/api';
import '../styles/FeatureCards.css'; 
import '../styles/Card.css';

const Home = () => {
  const [recommended, setRecommended] = useState([]);
  const navigate = useNavigate();

const calculateTotalDuration = (lessons) => {
    if (!lessons || !Array.isArray(lessons) || lessons.length === 0) {
      return "0m"; 
    }
    
    try {
      const totalMinutes = lessons.reduce((acc, lesson) => {
        const duration = lesson && lesson.duration ? parseInt(lesson.duration) : 0;
        return acc + duration;
      }, 0);

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    } catch (error) {
      console.error("Error calculating duration:", error);
      return "0m";
    }
  };

  useEffect(() => {
    const getRecommended = async () => {
      try {
        const data = await fetchCourses({ recommended: 'true', limit: 8 });
        setRecommended(data);
      } catch (err) { 
        console.error(err); 
      }
    };
    getRecommended();
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <Hero />

      <div className="feature-cards-wrapper">
        <div className="feature-cards-container">
          <div className="feature-card">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
            </div>
            <h3>Step-by-Step Progress</h3>
            <p>Track your learning journey and improve your understanding every day.</p>
            <button className="card-btn">Learn more</button>
          </div>

          <div className="feature-card center-card">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
              </svg>
            </div>
            <h3>Top Achiever Mindset</h3>
            <p>Build strong study habits and stay consistent in your exam preparation journey.</p>
            <button className="card-btn">Learn more</button>
          </div>

          <div className="feature-card">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
              </svg>
            </div>
            <h3>Exam Ready Focus</h3>
            <p>Master essential topics and concentrate on what truly matters for UTBK and TKA.</p>
            <button className="card-btn">Learn more</button>
          </div>
        </div>
      </div>

      <div className="recommended-section">
        <h2 className="recommended-title">Recommended for you</h2>
        <div className="course-grid">
          {recommended.map(item => (
            <Card 
              key={item._id} 
              item={{
                ...item,
                duration: calculateTotalDuration(item.lessons)
              }} 
              onClick={() => {
                navigate(`/course/${item._id}`);
                window.scrollTo(0, 0);
              }} 
            />
          ))}
        </div>
        <div className="view-more-wrapper">
          <button 
            className="view-more-btn" 
            onClick={() => {
              navigate('/all-courses');
              window.scrollTo(0, 0);
            }}
          >
            View More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;