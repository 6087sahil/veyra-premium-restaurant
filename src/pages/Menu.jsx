import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { starters, mains, desserts } from '../data/menuData';
import { useAppContext } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';
import './Menu.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const imageClip = {
  hidden: { clipPath: 'inset(100% 0 0 0)', scale: 1.05 },
  visible: { clipPath: 'inset(0% 0 0 0)', scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const { addToCart } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['ALL', 'SIGNATURE DISHES', 'MAINS', 'PASTA', 'DESSERTS', 'DRINKS'];

  return (
    <main className="menu-page-v2">
      {/* 1. Menu Hero */}
      <section className="menu-hero">
        <motion.div 
          className="menu-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          VEYRA MENU / 01
        </motion.div>
        
        <motion.h1 
          className="menu-hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          DISCOVER<br/>OUR FLAVORS.
        </motion.h1>
        
        <motion.div 
          className="title-underline"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
        
        <motion.p 
          className="menu-hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Thoughtfully crafted dishes made with fresh ingredients, timeless flavors and a touch of Veyra.
        </motion.p>
        
        <motion.div 
          className="menu-hero-image-wrapper"
          initial="hidden"
          animate="visible"
          variants={imageClip}
        >
          <div className="menu-hero-image">
            <img src="/showcase_ambience.jpg" alt="Veyra Dining Experience" />
          </div>
          <div className="menu-image-overlay"></div>
          <motion.div 
            className="menu-image-label"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            FRESH • LOCAL • CRAFTED
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Category Navigation */}
      <div className="menu-nav-container">
        <div className="menu-nav">
          {categories.map((cat) => (
            <button 
              key={cat}
              className={`menu-nav-item ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeCategory" 
                  className="nav-indicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Editorial Starters */}
      {(activeCategory === 'ALL' || activeCategory === 'SIGNATURE DISHES') && (
        <section className="menu-starters">
          <div className="starters-header">
            <motion.div 
              className="menu-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.6 }}
            >
              01 / TO BEGIN
            </motion.div>
            
            <motion.h2 
              className="starters-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={fadeUp}
            >
              SIGNATURE<br/>DISHES.
            </motion.h2>
            <motion.p 
              className="starters-desc"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Small plates. Bold flavors. The perfect beginning.
            </motion.p>
          </div>

          {/* Starter 1: Standard Asymmetric Left */}
          <motion.div 
            className="starter-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="starter-image-wrapper" variants={imageClip}>
              <img src="/dish_3.jpg" alt="Truffle Arancini" />
              <div className="starter-image-overlay"></div>
            </motion.div>
            <motion.div className="starter-content" variants={fadeUp}>
              <div className="st-num">01</div>
              <h3>TRUFFLE ARANCINI</h3>
              <p>Crispy risotto bites, black truffle, parmesan and herbs.</p>
              <div className="st-footer">
                <span className="st-price">{starters[0].priceLabel}</span>
                <button className="st-discover" onClick={() => addToCart(starters[0])} style={{background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', display: 'flex', alignItems: 'center', gap: '4px'}}>
                  ADD TO CART <ArrowRight size={14}/>
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Starter 2: Standard Asymmetric Right */}
          <motion.div 
            className="starter-row reverse"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="starter-image-wrapper" variants={imageClip}>
              <img src="/value_fresh.jpg" alt="Burrata & Tomato" />
              <div className="starter-image-overlay"></div>
            </motion.div>
            <motion.div className="starter-content" variants={fadeUp}>
              <div className="st-num">02</div>
              <h3>BURRATA & TOMATO</h3>
              <p>Creamy burrata, heirloom tomatoes, basil oil and sea salt.</p>
              <div className="st-footer">
                <span className="st-price">{starters[1].priceLabel}</span>
                <button className="st-discover" onClick={() => addToCart(starters[1])} style={{background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', display: 'flex', alignItems: 'center', gap: '4px'}}>
                  ADD TO CART <ArrowRight size={14}/>
                </button>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Starter 3: Wider Horizontal Overlapping */}
          <motion.div 
            className="starter-row-wide"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="starter-image-wide" variants={imageClip}>
              <img src="/home_hero.jpg" alt="Crispy Calamari" />
              <div className="starter-image-overlay"></div>
            </motion.div>
            <motion.div className="starter-content-overlap" variants={fadeUp}>
              <div className="st-num">03</div>
              <h3>CRISPY CALAMARI</h3>
              <p>Lightly fried calamari, lemon, herbs and house seasoning.</p>
              <div className="st-footer">
                <span className="st-price">{starters[4].priceLabel}</span>
                <button className="st-discover" onClick={() => addToCart(starters[4])} style={{background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', display: 'flex', alignItems: 'center', gap: '4px'}}>
                  ADD TO CART <ArrowRight size={14}/>
                </button>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Starter 4: Smaller Editorial Row */}
          <motion.div 
            className="starter-row-small"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="starter-image-small" variants={imageClip}>
              <img src="/value_craft.jpg" alt="Roasted Mushrooms" />
              <div className="starter-image-overlay"></div>
            </motion.div>
            <motion.div className="starter-content-small" variants={fadeUp}>
              <div className="st-num">04</div>
              <h3>ROASTED MUSHROOMS</h3>
              <p>Wild mushrooms, garlic butter, herbs and parmesan.</p>
              <div className="st-footer">
                <span className="st-price">{starters[5].priceLabel}</span>
                <button className="st-discover" onClick={() => addToCart(starters[5])} style={{background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', display: 'flex', alignItems: 'center', gap: '4px'}}>
                  ADD TO CART <ArrowRight size={14}/>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* 4. Menu Grid */}
      {(activeCategory === 'ALL' || activeCategory === 'MAINS') && (
        <section className="menu-grid-section">
          <div className="menu-grid">
            {[...starters, ...mains].map((item, index) => (
              <motion.div 
                className="menu-item"
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
              >
                <div className="item-img">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <h4>{item.name}</h4>
                    <span className="item-price">{item.priceLabel}</span>
                  </div>
                  <p className="item-desc">{item.desc}</p>
                  <button 
                    className="menu-item-link"
                    onClick={() => addToCart(item)}
                    style={{ background: 'none', border: 'none', padding: 0, display: 'inline-flex', alignItems: 'center', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', fontSize: '11px', letterSpacing: '0.1em', marginTop: '16px', fontWeight: 600 }}
                  >
                    ADD TO CART <ArrowRight size={14} style={{marginLeft: 4}}/>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Spotlight */}
      {(activeCategory === 'ALL') && (
        <section className="menu-spotlight">
          <motion.div 
            className="spotlight-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="spotlight-bg" variants={imageClip}>
              <img src="/cta_table.jpg" alt="Veyra Spotlight" />
            </motion.div>
            <div className="spotlight-overlay"></div>
            <motion.div className="spotlight-content" variants={fadeUp}>
              <h2>THE VEYRA<br/>SIGNATURE.</h2>
              <p>Our chef's favorite creation, prepared with seasonal ingredients and thoughtful technique.</p>
              <Link to="/about" className="spotlight-link">DISCOVER MORE →</Link>
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* 6. Desserts Grid */}
      {(activeCategory === 'ALL' || activeCategory === 'DESSERTS') && (
        <section className="menu-grid-section">
          <motion.h2 
            className="section-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            style={{ textAlign: 'left', marginBottom: '60px' }}
          >
            DESSERTS.
          </motion.h2>
          <div className="menu-grid">
            {desserts.map((item, index) => (
              <motion.div 
                className="menu-item"
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
              >
                <div className="item-img">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <h4>{item.name}</h4>
                    <span className="item-price">{item.priceLabel}</span>
                  </div>
                  <p className="item-desc">{item.desc}</p>
                  <button 
                    className="menu-item-link"
                    onClick={() => addToCart(item)}
                    style={{ background: 'none', border: 'none', padding: 0, display: 'inline-flex', alignItems: 'center', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', fontSize: '11px', letterSpacing: '0.1em', marginTop: '16px', fontWeight: 600 }}
                  >
                    ADD TO CART <ArrowRight size={14} style={{marginLeft: 4}}/>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Final CTA */}
      <section className="menu-final-cta">
        <div className="cta-split">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h2>READY TO<br />TASTE VEYRA?</h2>
            <p>Your table is waiting.</p>
            <div>
              <Link to="/" className="btn-gold-solid">
                RESERVE A TABLE <span className="btn-arr">→</span>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="cta-image-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="cta-image" variants={imageClip}>
              <img src="/cta_chef.jpg" alt="Chef preparing a dish" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Menu;
