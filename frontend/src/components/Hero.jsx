import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <video
        className="hero-video-bg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source
          src="/assets/final_noet_video.mp4"
          type="video/mp4"
        />
      </video>

      <div className="hero-overlay" aria-hidden="true"></div>

      <div className="container hero-content fade-in-up">
        <div className="hero-eyebrow delay-1">
          NATIONAL CONFERENCE · IIT (ISM) DHANBAD
        </div>

        <h1 className="hero-title delay-2">
          Net-Zero Emission Technologies for Sustainable Development
        </h1>

        <p className="hero-tagline delay-3">
          Challenges and Opportunities · NOET-2027
        </p>

        <div className="hero-details delay-3">
          <div className="hero-date-box">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="6"
                width="18"
                height="15"
                rx="2"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M3 10H21"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 4V8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16 4V8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <span>January 29–30, 2027</span>
          </div>

          <p className="hero-organizer">
            Organized by
            <strong>
              Department of Chemical Engineering, IIT (ISM) Dhanbad
            </strong>
          </p>
        </div>

        <div className="hero-cta delay-3">
          <a href="#registration" className="btn btn-primary">
            Register Now
          </a>

          <a href="#about" className="btn btn-secondary">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
