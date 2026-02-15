import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerApi } from '../services/api';
import Navbar from '../components/Navbar';
import '../styles/Auth.css';

const Register = () => {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerApi(data);

      alert(`Account created successfully! Welcome to Learnnova, ${data.name}.`);

      navigate('/login');
    } catch (err) {
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar variant="white" />
      <div className="auth-container">
        <div className="auth-content">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join thousands of grade 12 students and start your journey with Learnnova today.</p>
          
          <form onSubmit={handleRegister} className="auth-form">
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                required
                autoComplete="name"
                onChange={e => setData({...data, name: e.target.value})} 
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                autoComplete="email"
                onChange={e => setData({...data, email: e.target.value})} 
              />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="At least 8 characters" 
                required
                autoComplete="new-password"
                onChange={e => setData({...data, password: e.target.value})} 
              />
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

          <p className="auth-footer-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          
          <p className="copyright">© 2026 Learnnova. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;