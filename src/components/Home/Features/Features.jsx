import React from "react";
import { BookOpen, Brain, Users, Trophy } from "lucide-react";
import "./Features.css";

const features = [
  {
    icon: <BookOpen size={28} />,
    title: "Expert-Led Courses",
    description:
      "Learn from industry professionals with real-world experience and proven track records.",
  },
  {
    icon: <Brain size={28} />,
    title: "Adaptive Learning",
    description:
      "Personalized learning paths that adapt to your pace, style, and progress.",
  },
  {
    icon: <Users size={28} />,
    title: "Community Support",
    description:
      "Join a global community of learners and educators who inspire each other.",
  },
  {
    icon: <Trophy size={28} />,
    title: "Certification",
    description:
      "Earn industry-recognized certificates to showcase your achievements.",
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="features-header">
        <span className="section-badge">Why us</span>
        <h2>Why Choose Think-Box?</h2>
        <p className="features-subtitle">
          Everything you need for an effective, enjoyable learning experience.
        </p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon-wrapper">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
