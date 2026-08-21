import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import './About.css';

// Text reveal animations
const textContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const wordAnim = {
  hidden: { y: "120%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const imageClip = {
  hidden: { clipPath: 'inset(100% 0 0 0)', scale: 1.05 },
  visible: { clipPath: 'inset(0% 0 0 0)', scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, -100]);
  const yParallaxSlow = useTransform(scrollY, [0, 1000], [0, -50]);

  // Helper for word-by-word animation
  const splitText = (text) => {
    return text.split(" ").map((word, index) => (
      <span key={index} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingRight: '0.25em' }}>
        <motion.span variants={wordAnim} style={{ display: 'inline-block' }}>
          {word}
        </motion.span>
      </span>
    ));
  };

  return (
    <main className="about-page-v2">
      {/* Hero Section */}
      <section className="hero-editorial">
        <div className="hero-content">
          <motion.div 
            className="hero-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            ABOUT VEYRA / 01
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            variants={textContainer}
            initial="hidden"
            animate="visible"
          >
            <div style={{ overflow: 'hidden' }}>
              <motion.div variants={wordAnim}>OUR</motion.div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.div variants={wordAnim}>STORY</motion.div>
            </div>
          </motion.h1>
          
          <motion.div 
            className="hero-accent-line"
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          ></motion.div>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Crafted with passion.<br />Served with elegance.
          </motion.p>
        </div>
        
        <motion.div 
          className="hero-image-wrapper"
          variants={imageClip}
          initial="hidden"
          animate="visible"
        >
          <motion.img 
            src="/about_cinematic.jpg" 
            alt="Veyra Dining Atmosphere" 
            className="hero-image"
            style={{ y: yParallaxSlow }}
          />
          <div className="image-dark-overlay"></div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="story-two-col">
        <motion.div 
          className="story-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textContainer}
        >
          <h2>{splitText("FROM PASSION")}</h2>
          <h2 className="text-gold">{splitText("TO PLATE.")}</h2>
        </motion.div>
        
        <motion.div 
          className="story-right"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="story-label">OUR PHILOSOPHY</div>
          <p>
            At Veyra, we believe dining is more than a meal. It is an experience shaped by fresh ingredients, thoughtful preparation and the moments we share around the table.
          </p>
        </motion.div>
      </section>

      {/* Interaction Composition */}
      <section className="interaction-composition">
        <motion.div 
          className="bg-typography"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          FLAVOR
        </motion.div>
        
        <div className="composition-grid">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            <motion.div 
              className="comp-large-image"
              variants={imageClip}
              style={{ pointerEvents: 'auto' }}
            >
              <motion.img src="/about_chef.jpg" alt="Chef preparing dish" style={{ y: yParallax }} />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="comp-small-image"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <img src="/about_detail.jpg" alt="Fine wine and ingredients" />
            <div className="comp-text">
              Every detail carefully curated for perfection.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="values-horizontal">
        <div className="value-row">
          <motion.div 
            className="val-num"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >01</motion.div>
          <motion.div 
            className="val-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h3>FRESHNESS</h3>
            <p>Only the finest ingredients make it to your plate.</p>
          </motion.div>
        </div>
        
        <div className="value-row">
          <motion.div 
            className="val-num"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >02</motion.div>
          <motion.div 
            className="val-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h3>CRAFT</h3>
            <p>Every dish is thoughtfully prepared with passion.</p>
          </motion.div>
        </div>
        
        <div className="value-row">
          <motion.div 
            className="val-num"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >03</motion.div>
          <motion.div 
            className="val-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h3>CONNECTION</h3>
            <p>Because the best meals are meant to be shared.</p>
          </motion.div>
        </div>
      </section>

      {/* Cinematic Full Width Image */}
      <motion.section 
        className="cinematic-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="cinematic-wrapper"
          variants={imageClip}
        >
          <motion.img 
            src="/cinematic_feast.jpg" 
            alt="Restaurant dining feast" 
            className="cinematic-bg-img"
            style={{ y: yParallaxSlow }}
          />
          <div className="cinematic-darken"></div>
          
          <motion.div 
            className="cinematic-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textContainer}
          >
            <h2>
              <div style={{ overflow: 'hidden' }}><motion.div variants={wordAnim}>MORE THAN</motion.div></div>
              <div style={{ overflow: 'hidden' }}><motion.div variants={wordAnim}>A MEAL.</motion.div></div>
            </h2>
            <motion.p variants={fadeUp}>
              An experience created around flavor, warmth and connection.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Final CTA */}
      <section className="final-cta">
        <motion.div 
          className="cta-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textContainer}
        >
          <motion.h2 variants={fadeUp}>
            COME,<br />TASTE<br />OUR STORY.
          </motion.h2>
          <motion.p variants={fadeUp}>
            Discover the flavors that make Veyra special.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link to="/menu" className="cta-button-gold">
              EXPLORE OUR MENU <span className="cta-arr">→</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="cta-image-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/cta_chef.jpg" alt="Chef sprinkling spices on steak" />
        </motion.div>
      </section>

    </main>
  );
};

export default About;
