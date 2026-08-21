import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="hero-section">
      <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
        <motion.div 
          className="hero-background" 
          style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundPosition: "center", backgroundSize: "cover" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero-overlay"></div>
          <motion.div 
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="hero-title">Order your <br/>favourite food here</motion.h1>
            <motion.p variants={itemVariants} className="hero-description">
              Choose from a diverse menu featuring a delicious variety of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
            </motion.p>
            <motion.button 
              variants={itemVariants} 
              whileHover={{ scale: 1.03, y: -1, boxShadow: "0px 6px 12px rgba(0,0,0,0.2)" }} 
              whileTap={{ scale: 0.98 }}
              className="view-menu-btn"
            >
              View Menu
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
