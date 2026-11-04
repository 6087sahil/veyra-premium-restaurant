import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Header.css';

const NAV_LINKS = [
  { label: 'Menu', path: '/menu' },
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/journal' },
  { label: 'Events', path: '/#events' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [resConfirmed, setResConfirmed] = useState(false);
  const [partySize, setPartySize] = useState('2 Guests');
  const [resDate, setResDate] = useState('Today');
  const [resTime, setResTime] = useState('7:30 PM');

  const { setIsCartOpen, getCartCount } = useAppContext();
  const location = useLocation();
  const [prevLocationKey, setPrevLocationKey] = useState(location.key);

  // Close mobile menu on route change during render
  if (location.key !== prevLocationKey) {
    setPrevLocationKey(location.key);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }

  // Scroll listener (threshold: 40px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu or reservation modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isReservationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isReservationOpen]);

  // Handle Escape key to close mobile menu & reservation modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isReservationOpen) {
          setIsReservationOpen(false);
        } else if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, isReservationOpen]);

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setResConfirmed(true);
  };

  const closeReservationModal = () => {
    setIsReservationOpen(false);
    setResConfirmed(false);
  };

  const openReservationFromMobile = () => {
    setIsMobileMenuOpen(false);
    setIsReservationOpen(true);
  };

  return (
    <>
      <header className={`veyra-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="veyra-header-inner">
          {/* =================================================================
              PART 1 (LEFT): NAV LINKS
              ================================================================= */}
          <nav className="veyra-nav-left" aria-label="Main Navigation">
            <ul className="veyra-nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.label} className="veyra-nav-item">
                  {link.path.startsWith('/#') ? (
                    <a href={link.path} className="veyra-nav-link">
                      {link.label}
                    </a>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `veyra-nav-link ${isActive ? 'active' : ''}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* =================================================================
              PART 2 (CENTER): BRAND WORDMARK
              ================================================================= */}
          <div className="veyra-nav-center">
            <Link to="/" className="veyra-brand-wordmark" aria-label="Veyra Home">
              Veyra
            </Link>
          </div>

          {/* =================================================================
              PART 3 (RIGHT): PHONE/LOCATION & "RESERVE A TABLE"
              ================================================================= */}
          <div className="veyra-nav-right">
            <a
              href="tel:+18005558397"
              className="veyra-aux-link"
              aria-label="Call for reservations: +1 800 555 8397"
            >
              <Phone size={13} className="veyra-aux-icon" aria-hidden="true" />
              <span>+1 (800) 555-8397</span>
            </a>

            {/* Preserves Cart access if items are in cart */}
            {getCartCount && getCartCount() > 0 && (
              <button
                type="button"
                className="veyra-cart-trigger"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Open Cart (${getCartCount()} items)`}
              >
                <ShoppingCart size={18} />
                <span className="veyra-cart-badge">{getCartCount()}</span>
              </button>
            )}

            <button
              type="button"
              className="veyra-reserve-btn"
              onClick={() => setIsReservationOpen(true)}
              aria-haspopup="dialog"
            >
              Reserve a Table
            </button>

            {/* Mobile Animated Hamburger Button */}
            <button
              type="button"
              className={`veyra-hamburger-btn ${isMobileMenuOpen ? 'is-active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="veyra-mobile-menu"
            >
              <span className="veyra-hamburger-line line-1" />
              <span className="veyra-hamburger-line line-2" />
              <span className="veyra-hamburger-line line-3" />
            </button>
          </div>
        </div>
      </header>

      {/* =================================================================
          MOBILE MENU OVERLAY (FULL-SCREEN DARK OVERLAY)
          ================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="veyra-mobile-menu"
            className="veyra-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <nav className="veyra-mobile-nav" aria-label="Mobile Navigation">
              <ul className="veyra-mobile-nav-list">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.label}
                    className="veyra-mobile-nav-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.08 + 0.1,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {link.path.startsWith('/#') ? (
                      <a
                        href={link.path}
                        className="veyra-mobile-nav-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `veyra-mobile-nav-link ${isActive ? 'active' : ''}`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </NavLink>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="veyra-mobile-footer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <button
                type="button"
                className="veyra-mobile-reserve-btn"
                onClick={openReservationFromMobile}
              >
                Reserve a Table
              </button>

              <div className="veyra-mobile-socials" aria-label="Social links">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="veyra-mobile-social-icon"
                  aria-label="Instagram"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="veyra-mobile-social-icon"
                  aria-label="Facebook"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5c0-.988.245-1.49 1.5-1.49h2.5V2.5h-3.8c-3.1 0-4.2 1.6-4.2 4.4v2.61h-2.5v3.98h2.5v8.01z"/>
                  </svg>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="veyra-mobile-social-icon"
                  aria-label="X (formerly Twitter)"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="veyra-mobile-social-icon"
                  aria-label="YouTube"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================================
          RESERVE A TABLE MODAL
          ================================================================= */}
      <AnimatePresence>
        {isReservationOpen && (
          <div
            className="veyra-res-modal-backdrop"
            onClick={closeReservationModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="res-modal-title"
          >
            <motion.div
              className="veyra-res-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="veyra-res-modal-header">
                <h3 id="res-modal-title" className="veyra-res-modal-title">
                  {resConfirmed ? 'Reservation Confirmed' : 'Reserve a Table'}
                </h3>
                <button
                  type="button"
                  className="veyra-res-modal-close"
                  onClick={closeReservationModal}
                  aria-label="Close reservation dialog"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {resConfirmed ? (
                <div className="veyra-res-confirmed">
                  <div className="veyra-res-confirmed-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 className="veyra-res-confirmed-title">We Look Forward to Welcoming You</h4>
                  <p className="veyra-res-confirmed-desc">
                    Your table for <strong>{partySize}</strong> on <strong>{resDate}</strong> at <strong>{resTime}</strong> has been reserved. A confirmation has been sent to your email.
                  </p>
                  <button
                    type="button"
                    className="veyra-res-submit-btn"
                    style={{ width: '100%' }}
                    onClick={closeReservationModal}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form className="veyra-res-form" onSubmit={handleReservationSubmit}>
                  <div className="veyra-res-grid-2">
                    <div className="veyra-res-form-group">
                      <label htmlFor="res-party" className="veyra-res-label">Party Size</label>
                      <select
                        id="res-party"
                        className="veyra-res-select"
                        value={partySize}
                        onChange={(e) => setPartySize(e.target.value)}
                      >
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4 Guests</option>
                        <option>5 Guests</option>
                        <option>6 Guests</option>
                        <option>8+ Guests (Private Dining)</option>
                      </select>
                    </div>

                    <div className="veyra-res-form-group">
                      <label htmlFor="res-date" className="veyra-res-label">Date</label>
                      <select
                        id="res-date"
                        className="veyra-res-select"
                        value={resDate}
                        onChange={(e) => setResDate(e.target.value)}
                      >
                        <option>Today</option>
                        <option>Tomorrow</option>
                        <option>This Friday</option>
                        <option>This Saturday</option>
                        <option>This Sunday</option>
                      </select>
                    </div>
                  </div>

                  <div className="veyra-res-grid-2">
                    <div className="veyra-res-form-group">
                      <label htmlFor="res-time" className="veyra-res-label">Time</label>
                      <select
                        id="res-time"
                        className="veyra-res-select"
                        value={resTime}
                        onChange={(e) => setResTime(e.target.value)}
                      >
                        <option>6:00 PM</option>
                        <option>6:30 PM</option>
                        <option>7:00 PM</option>
                        <option>7:30 PM</option>
                        <option>8:00 PM</option>
                        <option>8:30 PM</option>
                        <option>9:00 PM</option>
                        <option>9:30 PM</option>
                      </select>
                    </div>

                    <div className="veyra-res-form-group">
                      <label htmlFor="res-seating" className="veyra-res-label">Seating Area</label>
                      <select id="res-seating" className="veyra-res-select">
                        <option>Main Dining Room</option>
                        <option>Chef's Counter</option>
                        <option>Terrace Lounge</option>
                        <option>Private Wine Room</option>
                      </select>
                    </div>
                  </div>

                  <div className="veyra-res-form-group">
                    <label htmlFor="res-name" className="veyra-res-label">Guest Name</label>
                    <input
                      id="res-name"
                      type="text"
                      className="veyra-res-input"
                      placeholder="e.g. Lorde Sterling"
                      required
                    />
                  </div>

                  <button type="submit" className="veyra-res-submit-btn">
                    Confirm Reservation
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
