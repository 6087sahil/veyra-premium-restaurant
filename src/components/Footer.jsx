import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import './Footer.css';

const LOCATIONS = [
  { city: 'New Delhi', country: 'India', flag: '🇮🇳' },
  { city: 'Mumbai', country: 'India', flag: '🇮🇳' },
  { city: 'Bengaluru', country: 'India', flag: '🇮🇳' },
  { city: 'Dubai', country: 'UAE', flag: '🇦🇪' },
  { city: 'London', country: 'United Kingdom', flag: '🇬🇧' },
  { city: 'New York', country: 'United States', flag: '🇺🇸' },
];

const Footer = () => {
  const { setIsReservationOpen } = useAppContext();
  // Mobile accordion state (columns 0, 1, 2)
  const [openAccordions, setOpenAccordions] = useState({});
  // Newsletter subscription state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const emailInputRef = useRef(null);

  // Location selector state
  const [currentLocation, setCurrentLocation] = useState('New Delhi, India');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Lock scroll and handle Escape for location modal
  useEffect(() => {
    if (isLocationModalOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsLocationModalOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isLocationModalOpen]);

  const toggleAccordion = (colKey) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [colKey]: !prev[colKey],
    }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleSignUpClick = () => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };

  const handleSelectLocation = (loc) => {
    setCurrentLocation(`${loc.city}, ${loc.country}`);
    setIsLocationModalOpen(false);
  };

  return (
    <footer className="veyra-footer">
      <div className="footer-container">
        {/* =================================================================
            TOP SECTION: 4 COLUMNS
            ================================================================= */}
        <div className="footer-top-grid">
          {/* Column 1: Explore */}
          <div className="footer-col">
            <div className="footer-col-header">
              <button
                type="button"
                className="footer-col-title"
                onClick={() => toggleAccordion('explore')}
                aria-expanded={!!openAccordions.explore}
                aria-controls="footer-nav-explore"
              >
                <span>Explore</span>
                <svg 
                  className={`footer-accordion-icon ${openAccordions.explore ? 'open' : ''}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
            <nav 
              id="footer-nav-explore"
              aria-label="Explore links" 
              className={`footer-nav-wrapper ${openAccordions.explore ? 'expanded' : ''}`}
            >
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <Link to="/menu" className="footer-nav-link">Menu</Link>
                </li>
                <li className="footer-nav-item">
                  <button 
                    type="button" 
                    className="footer-nav-link footer-nav-btn"
                    onClick={() => setIsReservationOpen(true)}
                  >
                    Reservations
                  </button>
                </li>
                <li className="footer-nav-item">
                  <Link to="/about" className="footer-nav-link">About Us</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/journal" className="footer-nav-link">Gallery</Link>
                </li>
                <li className="footer-nav-item">
                  <a href="/#events" className="footer-nav-link">Events</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 2: Visit Us */}
          <div className="footer-col">
            <div className="footer-col-header">
              <button
                type="button"
                className="footer-col-title"
                onClick={() => toggleAccordion('visit')}
                aria-expanded={!!openAccordions.visit}
                aria-controls="footer-nav-visit"
              >
                <span>Visit Us</span>
                <svg 
                  className={`footer-accordion-icon ${openAccordions.visit ? 'open' : ''}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
            <nav 
              id="footer-nav-visit"
              aria-label="Visit Us links" 
              className={`footer-nav-wrapper ${openAccordions.visit ? 'expanded' : ''}`}
            >
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <button 
                    type="button" 
                    className="footer-nav-link footer-nav-btn"
                    onClick={() => setIsLocationModalOpen(true)}
                  >
                    Location
                  </button>
                </li>
                <li className="footer-nav-item">
                  <a href="/#events" className="footer-nav-link">Opening Hours</a>
                </li>
                <li className="footer-nav-item">
                  <a href="mailto:concierge@veyra.com" className="footer-nav-link">Contact</a>
                </li>
                <li className="footer-nav-item">
                  <button 
                    type="button" 
                    className="footer-nav-link footer-nav-btn"
                    onClick={() => setIsReservationOpen(true)}
                  >
                    Private Dining
                  </button>
                </li>
                <li className="footer-nav-item">
                  <a href="mailto:careers@veyra.com" className="footer-nav-link">Careers</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3: Help */}
          <div className="footer-col">
            <div className="footer-col-header">
              <button
                type="button"
                className="footer-col-title"
                onClick={() => toggleAccordion('help')}
                aria-expanded={!!openAccordions.help}
                aria-controls="footer-nav-help"
              >
                <span>Help</span>
                <svg 
                  className={`footer-accordion-icon ${openAccordions.help ? 'open' : ''}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
            <nav 
              id="footer-nav-help"
              aria-label="Help and Policies links" 
              className={`footer-nav-wrapper ${openAccordions.help ? 'expanded' : ''}`}
            >
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <a href="#faq" className="footer-nav-link">FAQ</a>
                </li>
                <li className="footer-nav-item">
                  <a href="#gift-cards" className="footer-nav-link">Gift Cards</a>
                </li>
                <li className="footer-nav-item">
                  <a href="#privacy-policy" className="footer-nav-link">Privacy Policy</a>
                </li>
                <li className="footer-nav-item">
                  <a href="#terms-conditions" className="footer-nav-link">Terms &amp; Conditions</a>
                </li>
                <li className="footer-nav-item">
                  <a href="#cookie-settings" className="footer-nav-link">Cookie Settings</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 4: Join Our Table */}
          <div className="footer-col footer-col-newsletter">
            <div className="footer-col-header">
              <h3 className="footer-col-title">
                <span>Join Our Table</span>
              </h3>
            </div>
            <p className="footer-newsletter-text">
              Subscribe and get 10% off your first reservation!
            </p>
            
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address for newsletter
              </label>
              <div className="footer-input-row">
                <input
                  id="footer-newsletter-email"
                  ref={emailInputRef}
                  type="email"
                  className="footer-email-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="footer-subscribe-btn">
                  Subscribe
                </button>
              </div>

              <div className="footer-signup-link-wrap">
                <button 
                  type="button" 
                  className="footer-signup-link"
                  onClick={handleSignUpClick}
                >
                  SIGN UP NOW
                </button>
              </div>

              {subscribed && (
                <div className="footer-newsletter-feedback" role="status">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Welcome! Check your inbox for your 10% code.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* =================================================================
            THIN DIVIDER LINE
            ================================================================= */}
        <hr className="footer-divider" />

        {/* =================================================================
            MIDDLE SECTION: BRAND WORDMARK & LOCATION
            ================================================================= */}
        <div className="footer-middle-section">
          <Link to="/" className="footer-brand-title" aria-label="Veyra Homepage">
            Veyra
          </Link>
          <div className="footer-location-container">
            <span className="footer-location-current">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {currentLocation}
            </span>
            <button
              type="button"
              className="footer-change-loc-btn"
              onClick={() => setIsLocationModalOpen(true)}
              aria-haspopup="dialog"
            >
              CHANGE LOCATION
            </button>
          </div>
        </div>

        {/* =================================================================
            BOTTOM ROW: COPYRIGHT & SOCIAL ICONS
            ================================================================= */}
        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; 2026 Veyra. All rights reserved.
          </p>

          <div className="footer-social-links" role="group" aria-label="Social media profiles">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-circle"
              aria-label="Veyra on Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-circle"
              aria-label="Veyra on Facebook"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5c0-.988.245-1.49 1.5-1.49h2.5V2.5h-3.8c-3.1 0-4.2 1.6-4.2 4.4v2.61h-2.5v3.98h2.5v8.01z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-circle"
              aria-label="Veyra on X (formerly Twitter)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-circle"
              aria-label="Veyra on YouTube"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* Pinterest */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-circle"
              aria-label="Veyra on Pinterest"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0a12 12 0 0 0-4.37 23.18c-.02-.97-.04-2.46.12-3.52l1.04-4.4s-.26-.52-.26-1.3c0-1.22.7-2.13 1.58-2.13.75 0 1.11.56 1.11 1.23 0 .75-.48 1.88-.73 2.92-.21.87.44 1.58 1.3 1.58 1.56 0 2.76-1.65 2.76-4.02 0-2.1-1.51-3.57-3.66-3.57-2.5 0-3.96 1.87-3.96 3.8 0 .75.29 1.56.65 2 .07.09.08.16.06.25l-.25 1.01c-.04.16-.14.2-.31.12-1.16-.54-1.89-2.23-1.89-3.59 0-2.92 2.12-5.6 6.12-5.6 3.21 0 5.71 2.29 5.71 5.35 0 3.19-2.01 5.76-4.8 5.76-.94 0-1.82-.49-2.12-1.07l-.58 2.2c-.21.81-.78 1.82-1.16 2.44A12 12 0 1 0 12 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* =================================================================
          CHANGE LOCATION MODAL
          ================================================================= */}
      <AnimatePresence>
        {isLocationModalOpen && (
          <div 
            className="location-modal-backdrop"
            onClick={() => setIsLocationModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-dialog-title"
          >
            <motion.div 
              className="location-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="location-modal-header">
                <h4 id="location-dialog-title" className="location-modal-title">
                  Select Location
                </h4>
                <button 
                  type="button" 
                  className="location-modal-close" 
                  onClick={() => setIsLocationModalOpen(false)}
                  aria-label="Close location selector"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <ul className="location-list">
                {LOCATIONS.map((loc) => {
                  const label = `${loc.city}, ${loc.country}`;
                  const isSelected = currentLocation === label;
                  return (
                    <li key={label}>
                      <button
                        type="button"
                        className={`location-option ${isSelected ? 'active' : ''}`}
                        onClick={() => handleSelectLocation(loc)}
                      >
                        <span>
                          <span style={{ marginRight: '8px' }}>{loc.flag}</span>
                          {loc.city}, {loc.country}
                        </span>
                        {isSelected && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
