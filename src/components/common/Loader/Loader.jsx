import React, { useState, useEffect } from 'react';
import './Loader.css';

const SLOW_THRESHOLD = 4000;
const VERY_SLOW_THRESHOLD = 12000;

const Loader = ({ inline = false }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setElapsed(Date.now() - start), 1000);
    return () => clearInterval(id);
  }, []);

  const hint =
    elapsed >= VERY_SLOW_THRESHOLD
      ? 'Almost there — server is waking up...'
      : elapsed >= SLOW_THRESHOLD
        ? 'Connecting to server — this may take a moment...'
        : null;

  if (inline) {
    return (
      <div className="loader-inline" role="status" aria-label="Loading">
        <div className="loader-spinner" />
        <span className="loader-text">Loading...</span>
        {hint && <span className="loader-hint">{hint}</span>}
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
        {hint && <span className="loader-hint">{hint}</span>}
      </div>
    </div>
  );
};

export default Loader;
