import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { fetchCourseDetail, enrollCourseApi, fetchMyCourses, toggleLessonStatusApi } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/DetailCourse.css';

const DetailCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const getDetailAndStatus = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const fullCourseData = await fetchCourseDetail(id);
        
        if (!fullCourseData) {
          setLoading(false);
          return;
        }

        if (fullCourseData.lessons) {
          const total = fullCourseData.lessons.reduce((acc, lesson) => {
            return acc + (parseInt(lesson.duration) || 0);
          }, 0);
          setTotalDuration(total);
        }

        if (userData && userData._id) {
          const myCourses = await fetchMyCourses(userData._id);
          const coursesArray = Array.isArray(myCourses) ? myCourses : [];
          
          const enrolledData = coursesArray.find(c => {
            const cId = c?._id || c?.courseId?._id || c?.courseId;
            return cId?.toString() === id?.toString();
          });
          
          if (enrolledData) {
            setIsEnrolled(true);
            const rawLessons = fullCourseData.lessons || [];
            const completedIds = Array.isArray(enrolledData.completedLessons) 
              ? enrolledData.completedLessons.map(lid => lid.toString()) 
              : [];

            const mappedLessons = rawLessons.map(lesson => ({
              ...lesson,
              isCompleted: lesson._id ? completedIds.includes(lesson._id.toString()) : false
            }));

            setCourse({ ...fullCourseData, lessons: mappedLessons });
          } else {
            setCourse(fullCourseData);
          }
        } else {
          setCourse(fullCourseData);
        }
      } catch (err) {
        console.error("FATAL ERROR IN DETAIL COURSE:", err);
      } finally {
        setLoading(false);
      }
    };
    getDetailAndStatus();
    window.scrollTo(0, 0);
  }, [id]);

  const handleToggleLesson = async (lessonId) => {
    if (!isEnrolled) return;
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData?._id) return;

    try {
      const updatedLessons = await toggleLessonStatusApi(userData._id, id, lessonId);
      if (Array.isArray(updatedLessons)) {
        setCourse(prev => ({
          ...prev,
          lessons: [...updatedLessons] 
        }));
      }
    } catch (err) {
      console.error("Failed to update checklist:", err);
    }
  };

  const handleEnroll = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) return navigate('/login');
    setEnrolling(true);
    try {
      await enrollCourseApi({ userId: userData._id, courseId: id });
      setIsEnrolled(true);
      window.location.reload(); 
    } catch (err) {
      alert("Enrollment failed: " + err.message);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="loading-state">Loading data...</div>;
  if (!course) return <div className="loading-state">Course not found.</div>;

  return (
    <div className="detail-page">
      <Navbar variant="white" />
      <div className="detail-container">
        <div className="main-content">
          <div className="video-wrapper">
              {course.image && (
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="course-banner" 
                />
              )}
              <div className="play-button">
                <div className="play-icon"></div>
              </div>
            </div>
            
          <h1 className="course-title-text">{course.title || "Untitled Course"}</h1>
          <p className="course-description-text">{course.description || "No description available."}</p>
          
          <div className="mentor-section">
            <div className="mentor-avatar">
              {course.mentorImage && <img src={course.mentorImage} alt={course.mentorName} />}
            </div>
            <div className="mentor-info">
              <h4>{course.mentorName || "Instructor"}</h4>
              <p>{course.mentorRole || "Professional Mentor"}</p>
            </div>
          </div>

          <div className="review-section">
            <h3 className="section-title">Student Reviews</h3>
            <div className="review-summary">
              <div className="rating-big">
                <h1>{course.rating || "4.8"}</h1>
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="#FFD700" color="#FFD700" />
                  ))}
                </div>
                <p>Course Rating</p>
              </div>
              <div className="rating-bars">
                {[5, 4, 3, 2, 1].map((num) => (
                  <div key={num} className="bar-item">
                    <span>{num}</span>
                    <div className="bar-bg">
                      <div className="bar-fill" style={{ width: num === 5 ? '80%' : num === 4 ? '15%' : '5%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reviews-list">
              <div className="review-item">
                <div className="review-header">
                  <div className="user-info">
                    <div className="user-avatar-small">A</div>
                    <div>
                      <h5>Ariana Putri</h5>
                      <span>2 days ago</span>
                    </div>
                  </div>
                  <div className="user-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#FFD700" color="#FFD700" />
                    ))}
                  </div>
                </div>
                <p className="review-text">The explanations are very easy to understand for UTBK preparation. Really helpful!</p>
              </div>

              <div className="review-item">
                <div className="review-header">
                  <div className="user-info">
                    <div className="user-avatar-small">B</div>
                    <div>
                      <h5>Budi Santoso</h5>
                      <span>1 week ago</span>
                    </div>
                  </div>
                  <div className="user-rating">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} size={14} fill="#FFD700" color="#FFD700" />
                    ))}
                    <Star size={14} color="#FFD700" />
                  </div>
                </div>
                <p className="review-text">Highly recommended! The mentor explains everything clearly so the basic concepts are well-received.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-content">
          <div className="curriculum-card">
            <div className="curriculum-header">
              <span>Lessons</span>
              <span>{totalDuration} mins</span>
            </div>

            <div className="lessons-list">
              {(course.lessons || []).map((lesson, index) => (
                <div 
                  key={lesson._id || index} 
                  className={`lesson-item ${lesson.isCompleted ? 'active' : ''}`}
                  onClick={() => lesson._id && handleToggleLesson(lesson._id)}
                  style={{ cursor: isEnrolled ? 'pointer' : 'default' }}
                >
                  <div className="lesson-left">
                    <div className={`lesson-number ${lesson.isCompleted ? 'checked' : ''}`}>
                      {lesson.isCompleted ? '✓' : String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="lesson-info">
                    <p className="lesson-name">{lesson.title || "Untitled Lesson"}</p>
                    <span className="lesson-time">{lesson.duration || "0"} mins</span>
                  </div>
                  <div className="lesson-right">
                    <div className={`status-dot ${lesson.isCompleted ? 'filled' : ''}`}>
                      {lesson.isCompleted && <div className="inner-dot"></div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className={isEnrolled ? "btn-already-enrolled" : "btn-enroll-main"} 
              onClick={isEnrolled ? undefined : handleEnroll} 
              disabled={enrolling || isEnrolled}
            >
              {isEnrolled ? 'Already Enrolled' : (enrolling ? 'Enrolling...' : 'Enroll Now')}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailCourse;