import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Cart State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('veyra_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // UI State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('veyra_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart Actions
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    
    // Show Toast
    setToastMessage(`Added ${item.name} to cart`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) => 
      prev.map(i => {
        if (i.id === id) {
          const newQuantity = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQuantity };
        }
        return i;
      })
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <AppContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      isSearchOpen,
      setIsSearchOpen,
      isCartOpen,
      setIsCartOpen,
      toastMessage,
      setToastMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
