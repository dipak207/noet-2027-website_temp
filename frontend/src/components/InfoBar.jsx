import React from 'react';
import './InfoBar.css';

const InfoBar = () => {
  return (
    <div className="info-bar-container">
      <div className="info-bar glass">
        <a href="/extras/Howtoreach.pdf" target="_blank" rel="noreferrer" className="info-link">
          HOW TO REACH
        </a>
        <div className="info-separator"></div>
        <a href="https://www.iitism.ac.in/" target="_blank" rel="noreferrer" className="info-link">
          ABOUT IIT (ISM) DHANBAD
        </a>
        <div className="info-separator"></div>
        <a href="/extras/NEARBYATTRACTIONS.pdf" target="_blank" rel="noreferrer" className="info-link">
          PLACES OF ATTRACTION
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
