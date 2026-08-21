import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { allMenuData } from '../data/menuData';
import { useNavigate } from 'react-router-dom';
import './SearchOverlay.css';

const SearchOverlay = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useAppContext();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input on mount
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsSearchOpen]);

  // Prevent background scroll
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSearchOpen]);

  // Handle Search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const matches = allMenuData.filter(item => 
      item.name.toLowerCase().includes(lowerQuery) || 
      item.desc.toLowerCase().includes(lowerQuery)
    );
    setResults(matches);
  }, [query]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setIsSearchOpen(false);
  };

  const handleNavigateToMenu = () => {
    setIsSearchOpen(false);
    navigate('/menu');
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className="search-overlay"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="search-overlay-header">
            <div className="search-input-wrapper">
              <Search size={28} className="search-overlay-icon" />
              <input
                ref={inputRef}
                type="text"
                className="search-overlay-input"
                placeholder="Search dishes, ingredients, or drinks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button className="search-close-btn" onClick={() => setIsSearchOpen(false)}>
              <X size={32} />
            </button>
          </div>

          <div className="search-results-container">
            {query && results.length === 0 && (
              <div className="search-no-results">
                <p>No results found for "{query}".</p>
                <button className="btn-gold-solid" onClick={handleNavigateToMenu}>
                  VIEW FULL MENU
                </button>
              </div>
            )}

            {results.length > 0 && (
              <div className="search-results-grid">
                {results.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    className="search-result-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="search-result-img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="search-result-content">
                      <div className="search-result-header">
                        <h3>{item.name}</h3>
                        <span className="search-result-price">{item.priceLabel}</span>
                      </div>
                      <p className="search-result-desc">{item.desc}</p>
                      <button 
                        className="search-add-btn"
                        onClick={() => handleAddToCart(item)}
                      >
                        ADD TO CART <ArrowRight size={16} style={{marginLeft: 8}}/>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {!query && (
              <div className="search-suggestions">
                <p className="suggestions-title">SUGGESTIONS</p>
                <div className="suggestions-list">
                  <button onClick={() => setQuery('Truffle')}>Truffle</button>
                  <button onClick={() => setQuery('Wagyu')}>Wagyu</button>
                  <button onClick={() => setQuery('Chocolate')}>Chocolate</button>
                  <button onClick={() => setQuery('Pasta')}>Pasta</button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
