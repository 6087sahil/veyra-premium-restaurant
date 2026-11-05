import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
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
  const { setIsReservationOpen } = useAppContext();

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
      {/* 1. Bottom-Anchored Editorial Hero Section */}
      <section className="home-hero">
        <div className="home-hero-bg">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/home_hero.jpg"
            className="home-hero-video"
          >
            <source src="/000.mp4" type="video/mp4" />
          </video>
          {/* Bottom-up gradient overlay */}
          <div className="hero-gradient-overlay" />
        </div>

        <div className="home-hero-grid">
          {/* LEFT: Headline Block */}
          <motion.div 
            className="home-hero-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 1. Eyebrow: 48px gold line before "WELCOME TO VEYRA" */}
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" aria-hidden="true" />
              <span className="hero-eyebrow-text">WELCOME TO VEYRA</span>
            </div>
            
            {/* 2. Headline on two lines: "Flavors worth" / "remembering." Cormorant Garamond, 400, line-height 1.0 */}
            <h1 className="home-hero-title">
              <span className="hero-title-line">Flavors worth</span>
              <span className="hero-title-line text-gold font-italic">remembering.</span>
            </h1>

            {/* 3. Paragraph: 17px, rgba(255,255,255,0.75), max-width 480px, 24px below headline */}
            <p className="home-hero-subtitle">
              Where fresh ingredients, thoughtful craft, and unforgettable moments come together.
            </p>

            {/* 4. Buttons: 32px below paragraph */}
            <div className="home-hero-actions">
              <Link to="/menu" className="hero-btn-explore">
                EXPLORE MENU
              </Link>
              <Link to="/about" className="hero-btn-story-link">
                <span className="hero-story-text">Our Story</span>
                <span className="hero-story-arr" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: Floating Reservation Card */}
          <motion.div 
            className="hero-res-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="hero-res-card-inner">
              <div className="hero-res-label">RESERVE YOUR TABLE</div>

              {/* Three interactive rows: Date, Guests, Time */}
              <div className="hero-res-rows">
                <button 
                  type="button" 
                  className="hero-res-row" 
                  onClick={() => setIsReservationOpen(true)}
                  aria-label="Select reservation date"
                >
                  <span className="hero-res-key">Date</span>
                  <span className="hero-res-val">
                    Today <ChevronRight size={14} className="hero-res-chevron" aria-hidden="true" />
                  </span>
                </button>

                <button 
                  type="button" 
                  className="hero-res-row" 
                  onClick={() => setIsReservationOpen(true)}
                  aria-label="Select number of guests"
                >
                  <span className="hero-res-key">Guests</span>
                  <span className="hero-res-val">
                    2 People <ChevronRight size={14} className="hero-res-chevron" aria-hidden="true" />
                  </span>
                </button>

                <button 
                  type="button" 
                  className="hero-res-row" 
                  onClick={() => setIsReservationOpen(true)}
                  aria-label="Select reservation time"
                >
                  <span className="hero-res-key">Time</span>
                  <span className="hero-res-val">
                    7:30 PM <ChevronRight size={14} className="hero-res-chevron" aria-hidden="true" />
                  </span>
                </button>
              </div>

              {/* Gold full-width button */}
              <button 
                type="button" 
                className="hero-res-submit-btn" 
                onClick={() => setIsReservationOpen(true)}
              >
                <span className="hero-btn-label-desktop">Check Availability</span>
                <span className="hero-btn-label-mobile">Reserve a Table</span>
              </button>

              <div className="hero-res-footnote">
                Open daily 12pm &ndash; 11pm
              </div>
            </div>
          </motion.div>
        </div>
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
