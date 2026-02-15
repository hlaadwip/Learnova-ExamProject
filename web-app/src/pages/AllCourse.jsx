import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { fetchCourses } from '../services/api';
import '../styles/AllCourse.css';

const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [activeCat, setActiveCat] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Biology', 'Mathematics', 'Chemistry', 'Physics', 'Economics'];

  const calculateTotalDuration = (lessons) => {
    if (!lessons || !Array.isArray(lessons)) return "0m";
    const totalMinutes = lessons.reduce((acc, lesson) => acc + (parseInt(lesson.duration) || 0), 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses({ 
          category: activeCat === 'All' ? '' : activeCat 
        });
        setCourses(data);
      } catch (error) {
        console.error("Failed to load courses:", error);
      }
    };
    loadCourses();
    window.scrollTo(0, 0);
  }, [activeCat]);

  const handleCardClick = (id) => {
    navigate(`/course/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="all-course-page">
      <Navbar variant="white" />
      
      <div className="all-course-container">
        <header className="all-course-header">
          <h1>Explore All Courses</h1>
          <p>Browse subjects designed to help grade 12 students prepare for final exams, UTBK, and TKA.</p>
          <p>Choose your focus area and start learning today.</p>
        </header>
        
        <div className="filter-bar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`filter-btn ${activeCat === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="all-course-grid">
          {courses.length > 0 ? (
            courses.map(course => (
              <Card 
                key={course._id} 
                item={{
                  ...course,
                  duration: calculateTotalDuration(course.lessons)
                }} 
                onClick={() => handleCardClick(course._id)}
              />
            ))
          ) : (
            <p className="no-data">No courses found in this category.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllCourse;