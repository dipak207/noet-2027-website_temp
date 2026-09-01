import React, { useEffect, useRef } from 'react';
import './Hero.css';

const VIDEO_SRC = '/assets/final_noet_video.mp4';

const Hero = () => {
  const videoRef = useRef(null);

  // Belt-and-braces autoplay/loop handling. `autoPlay`+`loop` on the
  // <video> tag usually work on their own, but in practice this video
  // has been observed to freeze on a single frame instead of looping --
  // e.g. if the browser ever pauses it (a background/inactive tab,
  // autoplay being blocked until the DOM is fully interactive, or a
  // dropped frame right at the loop boundary), a plain `loop` attribute
  // never resumes it. This explicitly (re)starts playback on mount and
  // again any time the browser fires 'pause'/'ended' on it, so it never
  // gets stuck.
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return undefined;

    const play = () => {
      videoEl.play().catch(() => {
        // Autoplay can be rejected before the user has interacted with
        // the page at all; resume on the first interaction instead.
        const resume = () => {
          videoEl.play().catch(() => {});
          window.removeEventListener('pointerdown', resume);
          window.removeEventListener('keydown', resume);
        };
        window.addEventListener('pointerdown', resume, { once: true });
        window.addEventListener('keydown', resume, { once: true });
      });
    };

    const handleEnded = () => {
      // Redundant with the `loop` attribute, but guarantees the video
      // never stalls on its last frame if `loop` silently doesn't fire.
      videoEl.currentTime = 0;
      play();
    };

    play();
    videoEl.addEventListener('ended', handleEnded);
    videoEl.addEventListener('pause', play);
    document.addEventListener('visibilitychange', play);

    return () => {
      videoEl.removeEventListener('ended', handleEnded);
      videoEl.removeEventListener('pause', play);
      document.removeEventListener('visibilitychange', play);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <video
        ref={videoRef}
        className="hero-video-bg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      <div className="container hero-content fade-in-up">
        <div className="hero-eyebrow delay-1">National Conference · IIT (ISM) Dhanbad</div>

        <h1 className="hero-title delay-2">Net-Zero Emission Technologies for Sustainable Development</h1>

        <h4 className="hero-tagline delay-3">Challenges and Opportunities · N0ET-2027</h4>

        <div className="hero-details delay-3">
          <div className="hero-date-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="15" rx="2" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
              <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 4V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16 4V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>January 29–30, 2027</span>
          </div>
          <p className="hero-organizer">Organized by<br/><strong>Department of Chemical Engineering, IIT (ISM) Dhanbad</strong></p>
        </div>

        <div className="hero-cta delay-3">
          <a href="#registration" className="btn btn-primary">Register Now</a>
          <a href="#about" className="btn btn-secondary">Learn More</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
