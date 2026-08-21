import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const MenuSection = ({ title, dishes }) => {
  return (
    <section className="top-dishes-section" style={{ marginTop: '20px' }}>
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        {title}
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

export default MenuSection;
