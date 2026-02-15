import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginApi } from '../services/api';
import Navbar from '../components/Navbar';
import '../styles/Auth.css';

const Login = () => {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await loginApi(creds); 

      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      
      alert(`Welcome back, ${response.user.name}!`);
      
      navigate('/my-course'); 
      
    } catch (err) {
      alert("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar variant="white" />
      <div className="auth-container">
        <div className="auth-content">
          <h2 className="auth-title">Login to Learnnova</h2>
          <p className="auth-subtitle">Sign in to access your personalized learning dashboard and continue preparing for your final exams.</p>
          
          <form onSubmit={handleLogin} className="auth-form">
            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                autoComplete="email"
                onChange={e => setCreds({...creds, email: e.target.value})} 
              />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input 
                  type="password" 
                  placeholder="Enter your password" 
                  required
                  autoComplete="current-password"
                  onChange={e => setCreds({...creds, password: e.target.value})} 
                />
              </div>
              <div className="forgot-link">
                <Link to="/forgot">Forgot password?</Link>
              </div>
            </div>

            <button type="submit" className="btn-auth" disabled={loading}>
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </form>

          <div className="divider">
            <span>Or</span>
          </div>

          <div className="social-login">
            <button className="btn-social" type="button">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
              Continue with Google
            </button>
            <button className="btn-social" type="button">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
              Continue with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;