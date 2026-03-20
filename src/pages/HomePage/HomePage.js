import React from 'react';
import Hero from '../../components/Home/Hero/Hero';
import Features from '../../components/Home/Features/Features';
import Courses from '../../components/Home/Courses/Courses';
import Testimonials from '../../components/Home/Testimonials/Testimonials';
import CTA from '../../components/Home/CTA/CTA';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <Features />
      <Courses />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default HomePage;
