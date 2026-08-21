import React, { useState } from 'react';
import { Star, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TopDishes = () => {
  const dishes = [
    { name: 'Green Salad', img: 'green-salad.png', rating: 4.8, price: '25.00', desc: 'Fresh greens, vegetables and feta with a light dressing.' },
    { name: 'Rise Zucchini', img: 'rise-zucchini.png', rating: 4.7, price: '25.00', desc: 'Crispy zucchini cakes served with creamy herb sauce.' },
    { name: 'Clover Salad', img: 'clover-salad.png', rating: 4.6, price: '25.00', desc: 'Fresh greens with salmon, cucumber and herbs.' },
    { name: 'Bourbon Chicken', img: 'bourbon-chicken.png', rating: 4.6, price: '25.00', desc: 'Tender chicken glazed with a rich bourbon-style sauce.' },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="top-dishes-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        Top dishes near you
      </motion.h2>
      <div className="dishes-grid">
        {dishes.map((dish, i) => (
          <motion.div 
            key={dish.name} 
            className="dish-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: (i % 4) * 0.1 }}
            whileHover={{ y: -4, boxShadow: "0px 12px 24px rgba(0,0,0,0.12)" }}
          >
            <div className="dish-img-wrapper">
              <div className="dish-img-overlay"></div>
              <img src={`/images/${dish.img}`} alt={dish.name} />
            </div>
            <div className="dish-info">
              <h3 className="dish-name">{dish.name}</h3>
              <p className="dish-desc">{dish.desc}</p>
              <div className="dish-rating">
                <div className="stars">
                  {[...Array(4)].map((_, idx) => (
                    <Star key={idx} fill="#DEB203" stroke="none" size={14} />
                  ))}
                  <Star fill="none" stroke="#DEB203" strokeWidth={2} size={14} />
                </div>
                <span className="rating-score">{dish.rating}</span>
              </div>
              <span className="dish-price">${dish.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopDishes;
