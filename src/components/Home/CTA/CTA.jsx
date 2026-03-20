import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./CTA.css";

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <div className="cta-glow cta-glow--1" aria-hidden="true" />
      <div className="cta-glow cta-glow--2" aria-hidden="true" />
      <div className="cta-content">
        <span className="cta-badge">
          <Sparkles size={14} /> Start for free
        </span>
        <h2>Ready to Start Your Learning Journey?</h2>
        <p>
          Join thousands of learners who are already transforming their careers
          with Think-Box. Your first course is on us.
        </p>
        <div className="cta-actions">
          <button className="primary-button" onClick={() => navigate("/login")}>
            Start Learning Today <ArrowRight size={20} />
          </button>
          <button className="secondary-button" onClick={() => navigate("/courses")}>
            Browse Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
