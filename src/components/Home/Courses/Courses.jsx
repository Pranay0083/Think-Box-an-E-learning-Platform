import React, { useRef, useState, useEffect, useCallback } from "react";
import { Clock, BarChart2, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

const courseData = [
  {
    id: 1,
    title: "Web Development Masterclass",
    description:
      "Learn modern web development from scratch — HTML, CSS, JavaScript, React, and beyond.",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.9,
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Data Science Bootcamp",
    description:
      "Become a data science expert with Python, statistics, machine learning, and real-world projects.",
    duration: "12 weeks",
    level: "Intermediate",
    rating: 4.7,
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    description:
      "Master the core algorithms behind intelligent systems and build your own ML models.",
    duration: "10 weeks",
    level: "Beginner",
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "UI/UX Design Essentials",
    description:
      "Design beautiful, user-centered interfaces with Figma, wireframes, and prototyping.",
    duration: "6 weeks",
    level: "Beginner",
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Cloud Computing with AWS",
    description:
      "Deploy, scale, and manage applications on Amazon Web Services from day one.",
    duration: "10 weeks",
    level: "Intermediate",
    rating: 4.6,
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
];

const StarRating = ({ rating }) => (
  <div className="course-rating">
    <Star size={14} fill="var(--color-star)" stroke="var(--color-star)" />
    <span>{rating}</span>
  </div>
);

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div className="hp-course-card">
      <div className="hp-course-image-wrapper">
        <img src={course.imageUrl} alt={course.title} loading="lazy" />
        <span className="hp-course-level">{course.level}</span>
      </div>
      <div className="hp-course-body">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="hp-course-meta">
          <span className="hp-meta-item">
            <Clock size={14} /> {course.duration}
          </span>
          <span className="hp-meta-item">
            <BarChart2 size={14} /> {course.level}
          </span>
          <StarRating rating={course.rating} />
        </div>
        <button className="enroll-button" onClick={() => navigate("/courses")}>
          View Course
        </button>
      </div>
    </div>
  );
};

const Courses = () => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(".hp-course-card")?.offsetWidth || 340;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
  };

  return (
    <section className="popular-courses">
      <div className="courses-section-header">
        <div>
          <span className="section-badge">Top picks</span>
          <h2>Popular Courses</h2>
          <p className="courses-subtitle">
            Handpicked courses to kickstart or advance your career.
          </p>
        </div>
        <div className="carousel-nav">
          <button
            className="carousel-btn"
            onClick={() => scroll(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous courses"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="carousel-btn"
            onClick={() => scroll(1)}
            disabled={!canScrollRight}
            aria-label="Next courses"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="carousel-wrapper">
        {canScrollLeft && <div className="carousel-fade carousel-fade--left" aria-hidden="true" />}
        {canScrollRight && <div className="carousel-fade carousel-fade--right" aria-hidden="true" />}
        <div className="carousel-track" ref={trackRef}>
          {courseData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
