import React from 'react';
import { motion } from 'framer-motion';

const Categories = () => {
  const items = [
    { name: 'Salad', img: 'salad.png' },
    { name: 'Rolls', img: 'rolls.png' },
    { name: 'Deserts', img: 'deserts.png' },
    { name: 'Sandwich', img: 'sandwich.png' },
    { name: 'Cake', img: 'cake.png' },
    { name: 'Pure Veg', img: 'pure-veg.png' },
    { name: 'Pasta', img: 'pasta.png' },
    { name: 'Noodles', img: 'noodles.png' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="categories-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        Explore our menu
      </motion.h2>
      <motion.p 
        className="section-desc"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Choose from a diverse menu featuring a delightful array of dishes. Our mission to satisfy your cravings and elevate your dining experience one delicious meal at a time.
      </motion.p>
      
      <motion.div 
        className="categories-row"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {items.map(item => (
          <motion.div 
            key={item.name} 
            variants={itemVariants}
            className="category-item"
            whileHover={{ scale: 1.03, y: -4 }}
          >
            <motion.div className="category-img-wrapper" whileHover={{ boxShadow: "0px 8px 16px rgba(0,0,0,0.15)" }}>
              <img src={`/images/${item.img}`} alt={item.name} />
            </motion.div>
            <span className="category-name">{item.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Categories;
