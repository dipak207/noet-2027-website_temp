import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import AbstractModal from './AbstractModal';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAbstractModalOpen, setIsAbstractModalOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The header's real height (logo size + padding) changes across
  // breakpoints and between scrolled/unscrolled state. Rather than
  // hardcoding those numbers in Hero.css/index.css (which drifts out of
  // sync any time the header's own styling changes -- exactly what was
  // causing the hero title to render partly underneath the header),
  // measure it directly and publish it as a CSS variable everything
  // else can read.
  //
  // Set up ONCE on mount rather than re-subscribing on every
  // scrolled/menuOpen change: the ResizeObserver already fires on its
  // own whenever the header's actual box size changes for any reason
  // (scroll state, menu open/close, window resize, font load), so a
  // dependency-driven effect that tears down and recreates the observer
  // is both unnecessary and was the source of a bug where a change
  // triggered right as the header's height was mid-transition could be
  // measured and published before the transition settled.
  useLayoutEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return undefined;

    const publishHeight = () => {
      document.documentElement.style.setProperty('--header-h', `${headerEl.offsetHeight}px`);
    };

    publishHeight();
    const resizeObserver = new ResizeObserver(publishHeight);
    resizeObserver.observe(headerEl);
    window.addEventListener('resize', publishHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', publishHeight);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  
  const handleNavClick = (callback) => {
    callback();
    closeMenu();
  };

  return (
    <header ref={headerRef} className={`header ${scrolled ? 'glass' : ''}`}>
      <div className="container header-content">
        <div className="header-logos">
          <img src="/assets/Indian_Institute_of_Technology_Indian_School_of_Mines_Dhanbad_Logo.png" alt="IIT ISM Logo" className="header-logo-img" />
          <div className="logo">
            <img src="/assets/Screenshot 2026-08-28 205031.png" alt="N0ET Logo" className="header-logo-img n0et-logo" style={{borderRadius: 0}} />
            <span>N0ET-2027</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#themes">Themes</a></li>
            <li><a href="#dates">Dates</a></li>
            <li><a href="#committees">Committees</a></li>
            <li><a href="#registration">Registration</a></li>
            <li>
              <a href="/NOET-2027_Brochure_Final.pdf" download className="btn-brochure" title="Download Brochure">
                📄 Brochure
              </a>
            </li>
            <li>
              <button className="btn-abstract" onClick={() => setIsAbstractModalOpen(true)} title="Submit Abstract">
                📝 Abstract Submission
              </button>
            </li>
            <li className="theme-toggle">
              <button 
                onClick={toggleTheme} 
                title="Toggle Theme"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile/Tablet Navigation */}
        <div className="header-actions-mobile">
          <button 
            className="theme-toggle-mobile"
            onClick={toggleTheme} 
            title="Toggle Theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button 
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            title="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="nav-mobile">
            <ul className="nav-links-mobile">
              <li><a href="#about" onClick={closeMenu}>About</a></li>
              <li><a href="#themes" onClick={closeMenu}>Themes</a></li>
              <li><a href="#dates" onClick={closeMenu}>Dates</a></li>
              <li><a href="#committees" onClick={closeMenu}>Committees</a></li>
              <li><a href="#registration" onClick={closeMenu}>Registration</a></li>
              <li>
                <a href="/NOET-2027_Brochure_Final.pdf" download title="Download Brochure">
                  📄 Brochure
                </a>
              </li>
              <li>
                <button className="btn-abstract-mobile" onClick={() => handleNavClick(() => setIsAbstractModalOpen(true))} title="Submit Abstract">
                  📝 Abstract Submission
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <AbstractModal isOpen={isAbstractModalOpen} onClose={() => setIsAbstractModalOpen(false)} />
    </header>
  );
};

export default Header;