import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Header.css';

const NAV_LINKS = [
  { label: 'Menu', path: '/menu' },
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/journal' },
  { label: 'Events', path: '/#events' },
];

const POPULAR_SEARCHES = [
  'Tasting Menu',
  'Wine List',
  'Desserts',
  'Private Dining',
  'Vegetarian',
  'Truffle',
];

// Sample menu, drinks, and events dataset for live search
const SAMPLE_MENU_ITEMS = [
  {
    id: 's1',
    title: 'Truffle Arancini',
    category: 'Starters',
    desc: 'Crispy risotto spheres, wild mushroom, black truffle aioli, parmesan snow',
    price: '₹950',
    path: '/menu',
  },
  {
    id: 's2',
    title: 'Burrata Heirloom',
    category: 'Starters',
    desc: 'Fresh burrata, heirloom tomatoes, basil oil, aged balsamic reduction',
    price: '₹1200',
    path: '/menu',
  },
  {
    id: 's3',
    title: 'Seared Scallops',
    category: 'Starters',
    desc: 'Pan-seared scallops, cauliflower purée, crispy pancetta, herb oil',
    price: '₹1500',
    path: '/menu',
  },
  {
    id: 's4',
    title: 'Wagyu Carpaccio',
    category: 'Starters',
    desc: 'Thinly sliced wagyu beef, truffle oil, shaved parmesan, rocket leaves',
    price: '₹1800',
    path: '/menu',
  },
  {
    id: 'm1',
    title: 'Handmade Truffle Pasta',
    category: 'Mains',
    desc: 'Handmade taglierini, shaved black truffle, butter emulsion, parmigiano reggiano',
    price: '₹1200',
    path: '/menu',
  },
  {
    id: 'm2',
    title: 'Grilled Wagyu Steak',
    category: 'Mains',
    desc: 'Premium grilled wagyu, potato fondant, roasted asparagus, red wine jus',
    price: '₹2800',
    path: '/menu',
  },
  {
    id: 'm3',
    title: 'Miso Glazed Black Cod',
    category: 'Mains',
    desc: 'Sustainably sourced black cod, sweet miso glaze, pickled ginger, bok choy',
    price: '₹2400',
    path: '/menu',
  },
  {
    id: 'm4',
    title: 'Roasted Duck Breast',
    category: 'Mains',
    desc: 'Pan-roasted duck, cherry gastrique, parsnip purée, seasonal vegetables',
    price: '₹2200',
    path: '/menu',
  },
  {
    id: 'd1',
    title: 'Golden Chocolate Sphere',
    category: 'Desserts',
    desc: 'Dark chocolate shell, hazelnut mousse, salted caramel center, edible gold',
    price: '₹850',
    path: '/menu',
  },
  {
    id: 'd2',
    title: 'Vanilla Bean Panna Cotta',
    category: 'Desserts',
    desc: 'Madagascar vanilla bean, mixed berry compote, micro mint',
    price: '₹700',
    path: '/menu',
  },
  {
    id: 'd3',
    title: 'Artisanal Cheese Board',
    category: 'Desserts',
    desc: 'Selection of imported cheeses, honeycomb, candied walnuts, crackers',
    price: '₹1400',
    path: '/menu',
  },
  {
    id: 't1',
    title: 'Grand Tasting Menu',
    category: 'Tasting Menu',
    desc: 'Chef’s signature 8-course seasonal gastronomy journey with pairing options',
    price: '₹4800',
    path: '/menu',
  },
  {
    id: 'w1',
    title: 'Vintage Reserve Wine List',
    category: 'Wine List',
    desc: 'Sommelier cellar reserves from Bordeaux, Tuscany, Champagne and Napa Valley',
    price: 'Cellar',
    path: '/menu',
  },
  {
    id: 'p1',
    title: 'Private Dining Sanctuary',
    category: 'Private Dining',
    desc: 'Intimate dining sanctuary for up to 16 guests with bespoke chef menus',
    price: 'Inquire',
    path: '/#events',
  },
  {
    id: 'v1',
    title: 'Wild Forest Mushrooms',
    category: 'Vegetarian',
    desc: 'Sautéed wild forest mushrooms, garlic butter, fresh herbs, aged parmesan',
    price: '₹1100',
    path: '/menu',
  },
  {
    id: 'e1',
    title: 'Live Jazz & Wine Soirée',
    category: 'Events',
    desc: 'Weekend live acoustic jazz ensemble paired with reserve vintage tasting',
    price: 'Events',
    path: '/#events',
  },
];

// Helper to highlight matching characters in gold
const highlightMatch = (text, query) => {
  if (!query || !query.trim()) return text;
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="veyra-search-highlight">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const Header = () => {
  const { getCartCount, setIsCartOpen, isReservationOpen, setIsReservationOpen } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resConfirmed, setResConfirmed] = useState(false);
  const [partySize, setPartySize] = useState('2 Guests');
  const [resDate, setResDate] = useState('Today');
  const [resTime, setResTime] = useState('7:30 PM');

  // Search feature state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchBtnRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchPanelRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [prevLocationKey, setPrevLocationKey] = useState(location.key);

  // Close overlays on route change during render
  if (location.key !== prevLocationKey) {
    setPrevLocationKey(location.key);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
  }

  // Filter items based on query (max 6 results)
  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return SAMPLE_MENU_ITEMS.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      );
    }).slice(0, 6);
  }, [searchQuery]);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
    setActiveIndex(-1);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setActiveIndex(-1);
    // Return focus to the trigger icon
    setTimeout(() => {
      searchBtnRef.current?.focus();
    }, 50);
  }, []);

  // Scroll listener (threshold: 40px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Lock body scroll when mobile menu, reservation modal, or search panel is open
  useEffect(() => {
    if (isMobileMenuOpen || isReservationOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isReservationOpen, isSearchOpen]);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Global keyboard shortcuts: "/" and Ctrl/Cmd+K to toggle, Escape to close
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Escape key closes open overlay
      if (e.key === 'Escape') {
        if (isSearchOpen) {
          closeSearch();
          return;
        }
        if (isReservationOpen) {
          setIsReservationOpen(false);
          return;
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          return;
        }
      }

      // Check if user is typing inside an input/textarea/select
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isEditing =
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        activeTag === 'select' ||
        document.activeElement?.isContentEditable;

      // "/" opens search when not actively editing
      if (e.key === '/' && !isEditing && !isSearchOpen) {
        e.preventDefault();
        openSearch();
        return;
      }

      // Ctrl+K or Cmd+K toggles search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isSearchOpen) {
          closeSearch();
        } else {
          openSearch();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isSearchOpen, isReservationOpen, isMobileMenuOpen, openSearch, closeSearch, setIsReservationOpen]);

  // Focus trap inside search panel
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleFocusTrap = (e) => {
      if (e.key !== 'Tab') return;
      const panel = searchPanelRef.current;
      if (!panel) return;

      const focusable = panel.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener('keydown', handleFocusTrap);
    return () => window.removeEventListener('keydown', handleFocusTrap);
  }, [isSearchOpen]);

  // Keyboard navigation inside search results (Arrow keys + Enter)
  const handleInputKeyDown = (e) => {
    if (!filteredResults.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredResults.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && filteredResults[activeIndex]) {
        handleSelectItem(filteredResults[activeIndex]);
      } else if (filteredResults.length > 0) {
        handleSelectItem(filteredResults[0]);
      } else {
        navigate('/menu');
        closeSearch();
      }
    }
  };

  const handleSelectItem = (item) => {
    closeSearch();
    if (item.path.startsWith('/#')) {
      window.location.hash = item.path.replace('/#', '');
    } else {
      navigate(item.path);
    }
  };

  const handleChipSelect = (chip) => {
    setSearchQuery(chip);
    setActiveIndex(-1);
    searchInputRef.current?.focus();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredResults.length > 0) {
      handleSelectItem(filteredResults[0]);
    } else {
      navigate('/menu');
      closeSearch();
    }
  };

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
      <header className={`veyra-header ${isScrolled ? 'is-scrolled' : ''} ${isMobileMenuOpen ? 'is-menu-open' : ''}`}>
        <div className="veyra-header-inner">
          {/* =================================================================
              PART 1 (LEFT COLUMN): NAV LINKS (48px gap)
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
              PART 2 (CENTER COLUMN): "VEYRA" WORDMARK (Centered, 30px, 0.3em)
              ================================================================= */}
          <div className="veyra-nav-center">
            <Link to="/" className="veyra-brand-wordmark" aria-label="Veyra Home">
              Veyra
            </Link>
          </div>

          {/* =================================================================
              PART 3 (RIGHT COLUMN): SEARCH, CART, 1PX DIVIDER, BUTTON
              (Phone number removed from navbar)
              ================================================================= */}
          <div className="veyra-nav-right">
            {/* 1. Exactly ONE Search Trigger Icon (20px, 1.5px stroke, #e5e5e5) */}
            <button
              ref={searchBtnRef}
              type="button"
              className={`veyra-icon-btn veyra-search-btn ${isSearchOpen ? 'is-active' : ''}`}
              onClick={openSearch}
              aria-label="Open search"
              aria-expanded={isSearchOpen}
              aria-controls="veyra-search-panel"
              title="Search (/ or Ctrl+K)"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* 2. Cart Icon (20px, 1.5px stroke) with 16px Circle Badge */}
            <button
              type="button"
              className="veyra-icon-btn veyra-cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open Cart (${getCartCount ? getCartCount() : 0} items)`}
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {getCartCount && getCartCount() > 0 && (
                <span className="veyra-cart-badge">{getCartCount()}</span>
              )}
            </button>

            {/* 3. 1px Vertical Divider (24px height, rgba(255,255,255,0.15)) */}
            <div className="veyra-nav-divider" aria-hidden="true" />

            {/* 4. "Reserve a Table" Gold Pill Button (Height 42px, padding 0 28px) */}
            <button
              type="button"
              className="veyra-reserve-btn"
              onClick={() => setIsReservationOpen(true)}
              aria-haspopup="dialog"
            >
              Reserve a Table
            </button>

            {/* Mobile Hamburger Button (under 900px) */}
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

        {/* =================================================================
            SEARCH PANEL (SLIDES DOWN BENEATH NAVBAR)
            ================================================================= */}
        <AnimatePresence>
          {isSearchOpen && (
            <>
              {/* Dimmed Backdrop */}
              <motion.div
                className="veyra-search-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={closeSearch}
                aria-hidden="true"
              />

              {/* Full-width Search Panel */}
              <motion.div
                id="veyra-search-panel"
                ref={searchPanelRef}
                className="veyra-search-panel"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                role="region"
                aria-label="Search site"
              >
                <div className="veyra-search-container">
                  <form role="search" className="veyra-search-form" onSubmit={handleSearchSubmit}>
                    <div className="veyra-search-input-wrap">
                      <Search size={18} className="veyra-search-input-icon" aria-hidden="true" />
                      <label htmlFor="veyra-search-input" className="sr-only">
                        Search dishes, drinks, events
                      </label>
                      <input
                        id="veyra-search-input"
                        ref={searchInputRef}
                        type="search"
                        className="veyra-search-input"
                        placeholder="Search dishes, drinks, events..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setActiveIndex(-1);
                        }}
                        onKeyDown={handleInputKeyDown}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                      <button
                        type="button"
                        className="veyra-search-close-btn"
                        onClick={closeSearch}
                        aria-label="Close search"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </form>

                  {/* Popular Searches Pill Chips */}
                  <div className="veyra-search-popular">
                    <span className="veyra-search-popular-label">Popular searches:</span>
                    <div className="veyra-search-chips" role="list">
                      {POPULAR_SEARCHES.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          className="veyra-search-chip"
                          onClick={() => handleChipSelect(chip)}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Suggestions or Friendly Empty State */}
                  {searchQuery.trim().length > 0 && (
                    <div className="veyra-search-results-wrap">
                      {filteredResults.length > 0 ? (
                        <ul
                          className="veyra-search-results"
                          role="listbox"
                          aria-label="Search suggestions"
                        >
                          {filteredResults.map((item, idx) => (
                            <li
                              key={item.id}
                              role="option"
                              aria-selected={activeIndex === idx}
                              className={`veyra-search-item ${
                                activeIndex === idx ? 'is-selected' : ''
                              }`}
                              onClick={() => handleSelectItem(item)}
                              onMouseEnter={() => setActiveIndex(idx)}
                            >
                              <div className="veyra-search-item-info">
                                <div className="veyra-search-item-header">
                                  <span className="veyra-search-item-title">
                                    {highlightMatch(item.title, searchQuery)}
                                  </span>
                                  <span className="veyra-search-item-cat">
                                    {item.category}
                                  </span>
                                </div>
                                <p className="veyra-search-item-desc">
                                  {highlightMatch(item.desc, searchQuery)}
                                </p>
                              </div>
                              <div className="veyra-search-item-action">
                                {item.price && (
                                  <span className="veyra-search-item-price">
                                    {item.price}
                                  </span>
                                )}
                                <span className="veyra-search-item-arrow" aria-hidden="true">
                                  &rarr;
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="veyra-search-empty">
                          <p className="veyra-search-empty-text">
                            No results for &ldquo;<strong>{searchQuery}</strong>&rdquo;. Try browsing our menu.
                          </p>
                          <Link
                            to="/menu"
                            className="veyra-search-browse-btn"
                            onClick={closeSearch}
                          >
                            <span>Browse Full Menu</span>
                            <span aria-hidden="true">&rarr;</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* =================================================================
          MOBILE MENU OVERLAY (FULL-SCREEN DARK OVERLAY)
          Includes "Reserve a Table" button
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
              {/* "Reserve a Table" button moved into hamburger menu overlay */}
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
          RESERVE A TABLE MODAL (includes concierge phone number)
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

                  <div style={{ textAlign: 'center', marginTop: '2px', fontSize: '12px', color: '#8c8c8c' }}>
                    Direct concierge inquiries: <a href="tel:+18005558397" style={{ color: '#C49A5A', textDecoration: 'none' }}>+1 (800) 555-8397</a>
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
