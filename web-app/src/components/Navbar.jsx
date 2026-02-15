import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ variant }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleScroll = () => {
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    alert("You have been logged out successfully.");
    
    navigate('/');
    handleScroll();
  };

  return (
    <nav className={`navbar ${variant === 'white' ? 'navbar-white' : ''}`}>
      <div className="nav-left">
        <Link to="/" className="logo-container" onClick={handleScroll}>
          <img 
            src={variant === 'white' ? "/Logo2.png" : "/Logo.png"} 
            alt="Learnnova" 
            className="nav-logo" 
          />
        </Link>
                
        <div className="nav-menu">
          <Link 
            to="/" 
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} 
            onClick={handleScroll}
          >
            Home
          </Link>
          <Link 
            to="/all-courses" 
            className={`nav-item ${location.pathname === '/all-courses' ? 'active' : ''}`} 
            onClick={handleScroll}
          >
            All Course
          </Link>
          <Link 
            to="/my-course" 
            className={`nav-item ${location.pathname === '/my-course' ? 'active' : ''}`} 
            onClick={handleScroll}
          >
            My Course
          </Link>
        </div>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="user-greeting">Hi, {user.name}</span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-signin" onClick={handleScroll}>Sign In</Link>
            <Link to="/register" className="btn-signup" onClick={handleScroll}>Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;