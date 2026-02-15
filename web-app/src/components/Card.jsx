import React from 'react';
import { Star, Clock } from 'lucide-react';
import '../styles/Card.css';

const Card = ({ item, onClick }) => {
  return (
    <div className="card-container" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="img-box">
        <img src={item.image} alt={item.title} className="card-img" />
        <span className="category-badge">{item.category}</span>
      </div>
      <div className="card-info">
        <h3 className="card-title">{item.title}</h3>
        <div className="card-meta">
          <span>
            <Star size={14} fill="#FFD700" color="#FFD700"/> 
            {item.rating || '4.7'}
          </span>
          <span>
            <Clock size={14} /> 
            {item.duration || '5h 30m'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;