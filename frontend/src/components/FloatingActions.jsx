import React from 'react';
import './FloatingActions.css';

const FloatingActions = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="floating-actions-container">
      <button className="float-btn announcement-btn" onClick={() => scrollTo('announcements')}>
        📢 Announcements
      </button>
      <button className="float-btn contact-btn" onClick={() => scrollTo('contact')}>
        ✉️ Contact Us
      </button>
    </div>
  );
};

export default FloatingActions;
