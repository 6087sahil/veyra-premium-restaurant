import React from 'react';
import { motion } from 'framer-motion';

const CustomerSupport = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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
    <section className="customer-support-section">
      <motion.div 
        className="support-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div variants={itemVariants} className="support-left">
          <span className="support-label">CUSTOMER SUPPORT</span>
          <h2 className="support-heading">Let's elevate your<br/>dining experience</h2>
        </motion.div>
        <motion.div variants={itemVariants} className="support-center">
          <p>Need assistance?<br/>Get in touch with our concierge team.</p>
          <motion.button 
            whileHover={{ scale: 1.03, backgroundColor: "rgba(0,0,0,0.05)", y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="contact-btn"
          >
            CONTACT US
          </motion.button>
        </motion.div>
        <motion.div variants={itemVariants} className="support-right">
          <p>+1 (415) 123-4567</p>
          <p>Press@Thebestone.com</p>
          <p>Monday - Friday, 9AM - 6PM EST</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CustomerSupport;
