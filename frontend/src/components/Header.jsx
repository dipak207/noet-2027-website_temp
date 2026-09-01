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
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    const headerEl = headerRef.current;

    if (!headerEl) {
      return undefined;
    }

    const publishHeight = () => {
      document.documentElement.style.setProperty(
        '--header-h',
        `${headerEl.offsetHeight}px`
      );
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

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleAbstractClick = () => {
    setMenuOpen(false);
    setIsAbstractModalOpen(true);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`header ${scrolled ? 'scrolled' : 'hero-over-header'}`}
      >
        <div className="container header-content">
          <div className="header-logos">
            <a href="#home" className="brand-link" aria-label="NOET-2027 Home">
              <img
                src="/assets/Indian_Institute_of_Technology_Indian_School_of_Mines_Dhanbad_Logo.png"
                alt="IIT ISM Dhanbad Logo"
                className="header-logo-img"
              />

              <div className="logo">
                <img
                  src="/assets/Screenshot 2026-08-28 205031.png"
                  alt="NOET Logo"
                  className="header-logo-img n0et-logo"
                />
                <span>NOET-2027</span>
              </div>
            </a>
          </div>

          {/* Desktop navigation */}
          <nav className="nav-desktop" aria-label="Primary navigation">
            <ul className="nav-links">
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#themes">Themes</a>
              </li>
              <li>
                <a href="#dates">Dates</a>
              </li>
              <li>
                <a href="#committees">Committees</a>
              </li>
              <li>
                <a href="#registration">Registration</a>
              </li>
              <li>
                <a
                  href="/NOET-2027_Brochure_Final.pdf"
                  download
                  className="btn-brochure"
                  title="Download Brochure"
                >
                  <span aria-hidden="true">📄</span>
                  Brochure
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="btn-abstract"
                  onClick={() => setIsAbstractModalOpen(true)}
                  title="Submit Abstract"
                >
                  <span aria-hidden="true">📝</span>
                  Abstract Submission
                </button>
              </li>
              <li className="theme-toggle">
                <button
                  type="button"
                  onClick={toggleTheme}
                  title="Toggle Theme"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? '🌙' : '☀️'}
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile/tablet controls */}
          <div className="header-actions-mobile">
            <button
              type="button"
              className="theme-toggle-mobile"
              onClick={toggleTheme}
              title="Toggle Theme"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <button
              type="button"
              className={`hamburger ${menuOpen ? 'active' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              title="Toggle Menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          {/* Mobile menu */}
          <nav
            className={`nav-mobile ${menuOpen ? 'open' : ''}`}
            aria-label="Mobile navigation"
            aria-hidden={!menuOpen}
          >
            <ul className="nav-links-mobile">
              <li>
                <a href="#about" onClick={closeMenu}>
                  About
                </a>
              </li>
              <li>
                <a href="#themes" onClick={closeMenu}>
                  Themes
                </a>
              </li>
              <li>
                <a href="#dates" onClick={closeMenu}>
                  Dates
                </a>
              </li>
              <li>
                <a href="#committees" onClick={closeMenu}>
                  Committees
                </a>
              </li>
              <li>
                <a href="#registration" onClick={closeMenu}>
                  Registration
                </a>
              </li>
              <li>
                <a
                  href="/NOET-2027_Brochure_Final.pdf"
                  download
                  onClick={closeMenu}
                >
                  <span aria-hidden="true">📄</span>
                  Brochure
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="btn-abstract-mobile"
                  onClick={handleAbstractClick}
                >
                  <span aria-hidden="true">📝</span>
                  Abstract Submission
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <AbstractModal
        isOpen={isAbstractModalOpen}
        onClose={() => setIsAbstractModalOpen(false)}
      />
    </>
  );
};

export default Header;
