import React from "react";
import { Star } from "lucide-react";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Frontend Developer at Razorpay",
    avatar: "PS",
    rating: 5,
    text: "Think-Box completely transformed my career. The web development course was hands-on and the instructors were incredibly supportive.",
  },
  {
    id: 2,
    name: "James Miller",
    role: "Data Analyst at Spotify",
    avatar: "JM",
    rating: 5,
    text: "The Data Science Bootcamp gave me the confidence to switch careers. The projects felt like real-world problems, not toy examples.",
  },
  {
    id: 3,
    name: "Aisha Khan",
    role: "ML Engineer at Google",
    avatar: "AK",
    rating: 5,
    text: "I loved the adaptive learning paths. The platform figured out exactly where I was struggling and helped me improve fast.",
  },
  {
    id: 4,
    name: "Carlos Rivera",
    role: "UX Designer at Adobe",
    avatar: "CR",
    rating: 4,
    text: "Clean course design, excellent community, and the certification actually got noticed in my interviews. Highly recommended!",
  },
  {
    id: 5,
    name: "Emily Chen",
    role: "DevOps Engineer at AWS",
    avatar: "EC",
    rating: 5,
    text: "The cloud computing track was exactly what I needed. Went from zero to deploying production workloads in weeks.",
  },
  {
    id: 6,
    name: "Rahul Patel",
    role: "Full-Stack Developer",
    avatar: "RP",
    rating: 5,
    text: "Best learning platform I've used. The community support alone is worth it — I made connections that led to my current job.",
  },
];

const TestimonialCard = ({ t }) => (
  <div className="testimonial-card" aria-label={`Review by ${t.name}`}>
    <div className="testimonial-stars">
      {Array.from({ length: t.rating }, (_, i) => (
        <Star key={i} size={14} fill="var(--color-star)" stroke="var(--color-star)" />
      ))}
    </div>
    <p className="testimonial-text">{t.text}</p>
    <div className="testimonial-author">
      <div className="testimonial-avatar">{t.avatar}</div>
      <div>
        <span className="testimonial-name">{t.name}</span>
        <span className="testimonial-role">{t.role}</span>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <span className="section-badge">Testimonials</span>
        <h2>Loved by Learners</h2>
        <p className="testimonials-subtitle">
          See what our students have to say about their experience.
        </p>
      </div>

      <div className="marquee-wrapper" aria-label="Student testimonials, auto-scrolling">
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
