import React from "react";
import { ArrowRight, Play, GraduationCap, Users, BookOpen } from "lucide-react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <div className="hero-blob hero-blob--1" aria-hidden="true" />
      <div className="hero-blob hero-blob--2" aria-hidden="true" />

      <div className="hero-content">
        <span className="hero-badge">New courses added weekly</span>
        <h1>
          Unlock Your Potential with <span className="hero-highlight">Think-Box</span>
        </h1>
        <p>
          Transform your learning journey with interactive courses, expert
          instructors, and a supportive community.
        </p>
        <div className="hero-buttons">
          <button className="primary-button" onClick={() => navigate("/login")}>
            Get Started <ArrowRight size={20} />
          </button>
          <button
            className="secondary-button"
            onClick={() =>
              window.open(
                "https://github.com/Pranay0083/Think-Box-an-E-learning-Platform",
                "_blank"
              )
            }
          >
            <Play size={20} /> Watch Demo
          </button>
        </div>
        <div className="stats">
          <div className="stat-item">
            <div className="stat-icon">
              <GraduationCap size={20} />
            </div>
            <div>
              <span className="stat-number">50K+</span>
              <span className="stat-label">Active Students</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <Users size={20} />
            </div>
            <div>
              <span className="stat-number">200+</span>
              <span className="stat-label">Expert Instructors</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <BookOpen size={20} />
            </div>
            <div>
              <span className="stat-number">1000+</span>
              <span className="stat-label">Courses</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-image-wrapper">
        <div className="hero-image-glow" aria-hidden="true" />
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
          alt="Students collaborating on a project"
        />
      </div>
    </section>
  );
};

export default Hero;
