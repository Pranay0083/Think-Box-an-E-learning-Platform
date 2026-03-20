import React from 'react';
import './Loader.css';

const Loader = ({ inline = false }) => {
  if (inline) {
    return (
      <div className="loader-inline" role="status" aria-label="Loading">
        <div className="loader-spinner" />
        <span className="loader-text">Loading...</span>
      </div>
    );
  }

  return (
    <div className="loader-overlay" role="status" aria-live="polite" aria-label="Loading">
      <div className="loader-center">
        <div className="loader-ring">
          <div /><div /><div />
        </div>
        <span className="loader-label">Loading</span>
      </div>
    </div>
  );
};

export default Loader;
