import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div className="cc-card" onClick={() => navigate(`/courses/${course._id}`)}>
      <div className="cc-image">
        <img src={course.image} alt={course.title} loading="lazy" />
        {course.category && (
          <span className="cc-category">{course.category}</span>
        )}
      </div>
      <div className="cc-body">
        <h3 className="cc-title">{course.title}</h3>
        <p className="cc-desc">{course.description}</p>
        <div className="cc-meta">
          {course.duration && (
            <span className="cc-meta-item">
              <Clock size={14} /> {course.duration}
            </span>
          )}
          {course.students != null && (
            <span className="cc-meta-item">
              <Users size={14} /> {course.students}
            </span>
          )}
          {course.rating != null && (
            <span className="cc-meta-item cc-rating">
              <Star size={14} fill="var(--color-star)" stroke="var(--color-star)" />
              {course.rating}
            </span>
          )}
        </div>
        <div className="cc-footer">
          {course.price != null && (
            <span className="cc-price">${course.price}</span>
          )}
          <button className="cc-btn">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
