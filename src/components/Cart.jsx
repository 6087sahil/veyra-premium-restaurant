import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Cart.css';

const Cart = () => {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, getCartTotal } = useAppContext();

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsCartOpen]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Cart Drawer */}
          <motion.div
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-content">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p>Your cart is empty.</p>
                  <button className="btn-gold-solid" onClick={() => setIsCartOpen(false)}>
                    BROWSE MENU
                  </button>
                </div>
              ) : (
                <div className="cart-items">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id} 
                        className="cart-item"
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      >
                        <div className="cart-item-img">
                          <img src={item.img} alt={item.name} />
                        </div>
                        <div className="cart-item-details">
                          <div className="cart-item-header">
                            <h3>{item.name}</h3>
                            <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                              <X size={16} />
                            </button>
                          </div>
                          <p className="cart-item-price">₹{item.price * item.quantity}</p>
                          <div className="cart-item-controls">
                            <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                              <Minus size={14} />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}>
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-subtotal">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal()}</span>
                </div>
                <p className="cart-taxes">Taxes and shipping calculated at checkout.</p>
                <button className="btn-gold-solid cart-checkout-btn">
                  CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
