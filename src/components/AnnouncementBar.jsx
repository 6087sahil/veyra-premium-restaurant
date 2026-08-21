import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <motion.div 
      className="announcement-bar"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="announcement-content">
        <Sparkles size={14} className="announcement-sparkle" />
        <motion.div 
          className="announcement-text"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <span className="announcement-main">
            50% OFF YOUR FIRST ORDER
          </span>
          <span className="announcement-separator">•</span>
          <span className="announcement-sub">Limited-time offer</span>
          <span className="announcement-separator">•</span>
          <span className="announcement-sub">Use code: <span className="announcement-code">VEYRA50</span></span>
        </motion.div>
        <Sparkles size={14} className="announcement-sparkle" />
        <motion.button 
          className="announcement-cta"
          whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          ORDER NOW
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AnnouncementBar;
