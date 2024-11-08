import React from 'react';
import { Clock, BookOpen, BarChart } from 'lucide-react';
import { courses } from '../../data/courses';
import './EnrollmentPage.css';

const EnrollmentPage = () => {
  // Mock enrolled courses (in real app, this would come from user's data)
  const enrolledCourses = courses.slice(0, 3);

  return (
    <div className="enrollment-page">
      <div className="page-header">
        <h1>My Learning</h1>
        <div className="learning-stats">
          <div className="stat-card">
            <BookOpen size={24} />
            <div className="stat-info">
              <span className="stat-value">3</span>
              <span className="stat-label">Enrolled Courses</span>
            </div>
          </div>
          <div className="stat-card">
            <Clock size={24} />
            <div className="stat-info">
              <span className="stat-value">24h</span>
              <span className="stat-label">Learning Time</span>
            </div>
          </div>
          <div className="stat-card">
            <BarChart size={24} />
            <div className="stat-info">
              <span className="stat-value">67%</span>
              <span className="stat-label">Average Progress</span>
            </div>
          </div>
        </div>
      </div>

      <div className="enrolled-courses">
        <h2>Continue Learning</h2>
        <div className="courses-grid">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="enrolled-course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="progress-bar">
                  <div className="progress" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <div className="course-progress">
                  <span className="progress-text">60% Complete</span>
                  <span className="time-left">4h left</span>
                </div>
                <button className="continue-button">Continue Learning</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="learning-path">
        <h2>Recommended Next Steps</h2>
        <div className="path-timeline">
          {enrolledCourses[0].modules.slice(0, 3).map((module, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>{module.title}</h4>
                <p>{module.lessons[0].description}</p>
                <span className="duration">{module.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;