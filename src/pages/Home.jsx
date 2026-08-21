import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Home.css';

// Reusable animation variants
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

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollY } = useScroll();
  const yParallaxSlow = useTransform(scrollY, [0, 2000], [0, -150]);
  const yParallaxMedium = useTransform(scrollY, [0, 2000], [0, -250]);

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
    <main className="home-page-v2">
      {/* 1. Premium Hero Section */}
      <section className="home-hero">
        <div className="home-hero-bg">
          <motion.div variants={imageClip} initial="hidden" animate="visible" style={{ width: '100%', height: '100%' }}>
            <motion.img 
              src="/home_hero.jpg" 
              alt="Veyra Dining Experience" 
              style={{ y: yParallaxSlow }}
            />
            <div className="hero-dark-overlay"></div>
          </motion.div>
        </div>

        <div className="home-hero-content">
          <motion.div 
            className="hero-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            WELCOME TO VEYRA
          </motion.div>
          
          <motion.h1 
            className="home-hero-title"
            variants={textContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="title-row"><motion.div variants={wordAnim}>FLAVORS</motion.div></div>
            <div className="title-row"><motion.div variants={wordAnim}>WORTH</motion.div></div>
            <div className="title-row"><motion.div variants={wordAnim} className="text-gold">REMEMBERING.</motion.div></div>
          </motion.h1>

          <motion.p 
            className="home-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Where fresh ingredients, thoughtful craft and unforgettable moments come together.
          </motion.p>

          <motion.div 
            className="home-hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Link to="/menu" className="btn-gold-solid">
              EXPLORE MENU <span className="btn-arr">→</span>
            </Link>
            <Link to="/about" className="btn-ghost">
              OUR STORY <span className="btn-arr">→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="hero-floating-info left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          FRESH • LOCAL • CRAFTED
        </motion.div>

        <motion.div 
          className="hero-floating-info right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          EST. 2024
        </motion.div>

        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          SCROLL ↓
        </motion.div>
      </section>

      {/* 2. Intro Section */}
      <section className="home-intro">
        <motion.div 
          className="intro-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textContainer}
        >
          <motion.div variants={fadeUp} className="intro-label">THE VEYRA EXPERIENCE</motion.div>
          <motion.h2 variants={fadeUp}>
            {splitText("MORE THAN")}
            <br />
            {splitText("JUST FOOD.")}
          </motion.h2>
          <motion.p variants={fadeUp}>
            At Veyra, every plate is a celebration of flavor, craftsmanship and connection. We create memorable dining experiences using ingredients chosen with care.
          </motion.p>
        </motion.div>
      </section>

      {/* 3. Signature Dishes */}
      <section className="home-signatures">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textContainer}
        >
          <h2>{splitText("SIGNATURE")} <br/> {splitText("FLAVORS.")}</h2>
        </motion.div>

        <div className="signatures-grid">
          {/* Dish 1 */}
          <motion.div 
            className="sig-item layout-left"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="sig-image" variants={imageClip}>
              <img src="/dish_1.jpg" alt="Truffle Pasta" />
            </motion.div>
            <motion.div className="sig-content" variants={fadeUp}>
              <div className="sig-num">01</div>
              <h3>TRUFFLE PASTA</h3>
              <p>Creamy handmade pasta, fresh herbs & parmesan</p>
              <div className="sig-price">₹1200 <span className="sig-arr">→</span></div>
            </motion.div>
          </motion.div>

          {/* Dish 2 */}
          <motion.div 
            className="sig-item layout-right"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="sig-image" variants={imageClip}>
              <img src="/dish_2.jpg" alt="Wagyu Steak" />
            </motion.div>
            <motion.div className="sig-content" variants={fadeUp}>
              <div className="sig-num">02</div>
              <h3>WAGYU STEAK</h3>
              <p>Premium grilled steak with asparagus and jus</p>
              <div className="sig-price">₹2800 <span className="sig-arr">→</span></div>
            </motion.div>
          </motion.div>

          {/* Dish 3 */}
          <motion.div 
            className="sig-item layout-center"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="sig-image" variants={imageClip}>
              <img src="/dish_3.jpg" alt="Seared Scallops" />
            </motion.div>
            <motion.div className="sig-content" variants={fadeUp}>
              <div className="sig-num">03</div>
              <h3>SEARED SCALLOPS</h3>
              <p>Elegant seafood appetizer with delicate garnish</p>
              <div className="sig-price">₹1500 <span className="sig-arr">→</span></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Interactive Food Showcase */}
      <motion.section 
        className="home-showcase"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="showcase-wrapper"
          variants={imageClip}
        >
          <motion.img 
            src="/showcase_ambience.jpg" 
            alt="Chefs in open kitchen" 
            className="showcase-img"
            style={{ y: yParallaxMedium }}
          />
          <div className="showcase-overlay"></div>
          <motion.h2 
            className="showcase-text"
            variants={fadeUp}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            CULINARY MASTERY.
          </motion.h2>
        </motion.div>
      </motion.section>

      {/* 5. Why Veyra */}
      <section className="home-values">
        <motion.div 
          className="values-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textContainer}
        >
          <h2>{splitText("CRAFTED")} <br/> {splitText("WITH INTENTION.")}</h2>
        </motion.div>

        <div className="values-list">
          <motion.div 
            className="value-row"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="val-image" variants={imageClip}>
              <img src="/value_fresh.jpg" alt="Fresh ingredients" />
              <div className="val-image-caption">FARM TO TABLE</div>
            </motion.div>
            <motion.div className="val-content-wrapper" variants={fadeUp}>
              <div className="val-num">01</div>
              <div className="val-content">
                <h3>FRESH INGREDIENTS</h3>
                <p>Selected carefully. Prepared fresh.</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="value-row row-reverse"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="val-image" variants={imageClip}>
              <img src="/value_craft.jpg" alt="Thoughtful Craft" />
              <div className="val-image-caption">ART ON A PLATE</div>
            </motion.div>
            <motion.div className="val-content-wrapper" variants={fadeUp}>
              <div className="val-num">02</div>
              <div className="val-content">
                <h3>THOUGHTFUL CRAFT</h3>
                <p>Every detail has a purpose.</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="value-row"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="val-image" variants={imageClip}>
              <img src="/home_hero.jpg" alt="Memorable Moments" />
              <div className="val-image-caption">COME, TASTE OUR STORY.</div>
            </motion.div>
            <motion.div className="val-content-wrapper" variants={fadeUp}>
              <div className="val-num">03</div>
              <div className="val-content">
                <h3>MEMORABLE MOMENTS</h3>
                <p>Made to be enjoyed together.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. Full-Width Experience Section */}
      <motion.section 
        className="home-experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="experience-wrapper" variants={imageClip}>
          <motion.img 
            src="/cinematic_feast.jpg" 
            alt="Dining Feast" 
            className="experience-bg"
            style={{ y: yParallaxSlow }}
          />
          <div className="experience-darken"></div>
          
          <motion.div 
            className="experience-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textContainer}
          >
            <h2>
              {splitText("TASTE THE")} <br/> {splitText("DIFFERENCE.")}
            </h2>
            <motion.p variants={fadeUp}>
              From our kitchen to your table.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/about" className="text-link-gold">
                DISCOVER OUR STORY <span className="link-arr">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 7. Final CTA */}
      <section className="home-final-cta">
        <div className="cta-split">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textContainer}
          >
            <motion.h2 variants={fadeUp}>
              YOUR TABLE<br />IS WAITING.
            </motion.h2>
            <motion.p variants={fadeUp}>
              Discover your next favorite dish at Veyra.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/menu" className="btn-gold-solid">
                EXPLORE MENU <span className="btn-arr">→</span>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="cta-image-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="cta-image" variants={imageClip}>
              <img src="/cta_table.jpg" alt="Elegantly set dining table waiting for guests" />
            </motion.div>
          </motion.div>
        </div>
      </section>

    </main>
  );
};

export default Home;
