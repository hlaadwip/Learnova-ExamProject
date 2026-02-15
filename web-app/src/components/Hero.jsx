import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Hero.css';

const Hero = () => {
  const navigate = useNavigate(); 

  const handleGetStarted = () => {
    window.scrollTo(0, 0);
    navigate('/my-course');
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="hero-subtitle">Welcome to Learnova</p>
        <h1 className="hero-title">
          Learn with Purpose. <br/> 
          Achieve with <span className="highlight">Confidence.</span>
        </h1>
        <p className="hero-description">
          Designed to support grade 12 students in their final exam journey, this platform provides essential materials, organized topics, and a clear path to better results.
        </p>
        
        <button 
          className="hero-btn" 
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
      <div className="hero-image-container">
        <img src="/hero-girl.png" alt="Hero" className="hero-img" />
      </div>
    </section>
  );
};

export default Hero;