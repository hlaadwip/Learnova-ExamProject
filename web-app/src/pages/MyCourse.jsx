import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { fetchMyCourses } from '../services/api';
import '../styles/MyCourse.css';

const MyCourse = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));

  const today = new Date();
  const realToday = today.getDate();
  const realMonth = today.getMonth();
  const realYear = today.getFullYear();

  useEffect(() => {
    const getMyData = async () => {
      const userId = userData?._id || userData?.id;
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchMyCourses(userId);
        setMyCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };
    getMyData();
  }, [userData]);

  const calculateTotalDuration = (lessons) => {
    if (!lessons || !Array.isArray(lessons)) return "0m";
    const totalMinutes = lessons.reduce((acc, lesson) => acc + (parseInt(lesson.duration) || 0), 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const filteredCourses = myCourses
    .filter(course => {
      if (activeTab === 'All') return true;
      return course.status && course.status.toLowerCase() === activeTab.toLowerCase();
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const upcomingSchedules = myCourses
    .filter(course => course.status && course.status.toLowerCase() === 'ongoing')
    .sort((a, b) => {
      const titleA = (a._doc?.title || a.title || "").toUpperCase();
      const titleB = (b._doc?.title || b.title || "").toUpperCase();
      return titleA.localeCompare(titleB);
    });

  const renderCalendar = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    const realDayOfWeek = today.getDay(); 
    
    // Fill empty slots
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Fill actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const isTodayLive = d === realToday && month === realMonth && year === realYear;
      
      const isSelected = d === selectedDate.getDate() && 
                         month === selectedDate.getMonth() && 
                         year === selectedDate.getFullYear();

      days.push(
        <div 
          key={d} 
          className={`calendar-day ${isTodayLive ? 'today-live' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedDate(new Date(year, month, d))}
        >
          {d}
        </div>
      );
    }

    return (
      <div className="calendar-card">
        <div className="calendar-header-real">
          <button onClick={() => setCurrentDate(new Date(year, month - 1))}><ChevronLeft size={16}/></button>
          <span>{monthNames[month]} {year}</span>
          <button onClick={() => setCurrentDate(new Date(year, month + 1))}><ChevronRight size={16}/></button>
        </div>
        
        <div className="calendar-weekdays">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, index) => (
            <div 
              key={d} 
              className={index === realDayOfWeek && month === realMonth && year === realYear ? 'active-day' : ''}
            >
              {d}
            </div>
          ))}
        </div>
        
        <div className="calendar-grid-real">{days}</div>
      </div>
    );
  };

  // Auth Guard
  if (!userData) {
    return (
      <div className="mycourse-page">
        <Navbar variant="white" />
        <div className="auth-placeholder-container">
          <div className="auth-placeholder-content">
            <h1>Please Sign In First</h1>
            <p>You need to sign in to access your courses and track your learning progress.</p>
            <div className="auth-links">
              <span onClick={() => navigate('/login')} className="auth-link-blue">Sign In</span>
              <span className="auth-separator"> | </span>
              <span className="auth-secondary-text">Don't have an account? </span>
              <span onClick={() => navigate('/register')} className="auth-link-blue">Create one</span>
            </div>
          </div>
        </div>
        <footer className="simple-footer">© 2026 Learnova. All rights reserved.</footer>
      </div>
    );
  }

  return (
    <div className="mycourse-page">
      <Navbar variant="white" />
      <div className="mycourse-container">
        <header className="mycourse-header">
          <h1>My Learning Journey</h1>
          <p>Track your progress and continue where you left off.</p>
        </header>

        <div className="mycourse-layout">
          <aside className="mycourse-sidebar">
            {renderCalendar()}
            <div className="upcoming-schedules">
              <h3>Upcoming Schedules</h3>
              <div className="upcoming-schedules-list">
                {loading ? (
                  <p className="no-sched">Checking schedules...</p>
                ) : upcomingSchedules.length > 0 ? (
                  upcomingSchedules.map((item, index) => {
                    const coreData = item._doc || item;
                    const displayTitle = coreData.title || item.title || "Untitled Course";
                    const displayImage = coreData.image || item.image || "";
                    const displayId = item._id || coreData._id;

                    const startTime = 10 + (index % 3); 
                    const timeString = `${startTime}:00 - ${startTime + 1}:30 AM`;

                    return (
                      <div key={`sched-${displayId}`} className="schedule-mini-card" onClick={() => navigate(`/course/${displayId}`)}>
                        <img src={displayImage} alt={displayTitle} />
                        <div className="sched-info">
                          <h4>{displayTitle}</h4>
                          <p>{item.nextTopic || "Ready to study"}</p>
                          <span><Clock size={12} /> {timeString}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="no-sched">No upcoming tasks. Time to explore!</p>
                )}
              </div>
            </div>
          </aside>

          <main className="mycourse-main">
            <div className="course-tabs">
              {['All', 'Ongoing', 'Complete'].map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mycourse-grid">
              {loading ? (
                <p className="empty-msg">Syncing your courses.</p>
              ) : filteredCourses.length === 0 ? (
                <p className="empty-msg">You haven't enrolled in any {activeTab.toLowerCase()} courses yet.</p>
              ) : (
                filteredCourses.map(course => {
                  const coreData = course._doc || course;
                  const courseId = course._id || coreData._id;
                  const progressValue = course.progress || 0;
                  
                  return (
                    <div key={courseId} className="course-progress-card" onClick={() => navigate(`/course/${courseId}`)}>
                      <div className="card-thumb">
                        <img src={coreData.image || course.image} alt={coreData.title} />
                        <span className="badge-tag">{coreData.category || course.category}</span>
                      </div>
                      <div className="card-body">
                        <h3>{coreData.title || course.title}</h3>
                        <div className="card-meta">
                          <span><Star size={14} fill="#FFD700" color="#FFD700" /> {coreData.rating || course.rating || '4.7'}</span>
                          <span><Clock size={14} /> {calculateTotalDuration(coreData.lessons || course.lessons)}</span>
                        </div>
                        <div className="progress-wrapper">
                          <div className="progress-container">
                            <div className="progress-bar" style={{ width: `${progressValue}%` }}></div>
                          </div>
                          <span className="progress-text">{progressValue}% Completed</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MyCourse;