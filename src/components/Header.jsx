import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { ChefHat, Search, ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { setIsSearchOpen, setIsCartOpen, getCartCount } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scroll when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header 
        className="header"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link to="/" className="logo-container" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ChefHat className="logo-icon" size={32} color="#855B32" />
        <span className="logo-text">Veyra</span>
      </Link>
      
      <nav className="nav-container">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
        <NavLink to="/menu" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Menu</NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About Us</NavLink>
        <NavLink to="/journal" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Journal</NavLink>
      </nav>
      
      <div className="actions-container">
        <ThemeToggle />
        <motion.div 
          whileHover={{ scale: 1.03 }} 
          className="search-icon"
          onClick={() => setIsSearchOpen(true)}
          style={{ cursor: 'pointer' }}
        >
          <Search size={24} color="#855B32" className="action-icon-color" />
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.03 }} 
          className="user-icon"
          onClick={() => setIsCartOpen(true)}
          style={{ cursor: 'pointer' }}
        >
          <ShoppingCart size={24} color="#855B32" className="action-icon-color" />
          {getCartCount() > 0 && <div className="badge">{getCartCount()}</div>}
        </motion.div>
        <motion.button 
          whileHover={{ scale: 1.03 }} 
          whileTap={{ scale: 0.98 }} 
          transition={{ duration: 0.2 }}
          className="sign-in-btn"
          onClick={() => navigate('/signin')}
        >
          Sign in
        </motion.button>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} color="#855B32" className="action-icon-color" />
        </button>
      </div>
    </motion.header>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          className="mobile-menu-overlay"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mobile-menu-header">
            <Link to="/" className="logo-container" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ChefHat className="logo-icon" size={32} color="#855B32" />
              <span className="logo-text">Veyra</span>
            </Link>
            <button 
              className="mobile-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} color="#855B32" className="action-icon-color" />
            </button>
          </div>
          
          <nav className="mobile-nav-container">
            <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
            <NavLink to="/menu" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>Menu</NavLink>
            <NavLink to="/about" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>About Us</NavLink>
            <NavLink to="/journal" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>Journal</NavLink>
            
            <div className="mobile-menu-footer">
              <button 
                className="btn-gold-solid"
                onClick={() => { setIsMobileMenuOpen(false); navigate('/signin'); }}
                style={{ width: '100%', padding: '16px', fontSize: '16px' }}
              >
                SIGN IN
              </button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default Header;
