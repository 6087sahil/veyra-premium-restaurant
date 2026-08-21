import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Content.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const textContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const imageClip = {
  hidden: { clipPath: 'inset(100% 0 0 0)', scale: 1.05 },
  visible: { clipPath: 'inset(0% 0 0 0)', scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const stories = [
  { category: 'FOOD & CULTURE', title: 'The Revival of Heritage Grains', desc: 'Exploring the ancient varieties making a comeback in modern dining.', date: 'OCT 12', img: '/value_craft.jpg' },
  { category: 'BEHIND THE KITCHEN', title: 'A Day With Our Sous Chef', desc: 'The dedication and rhythm of the kitchen before the doors open.', date: 'SEP 28', img: '/cta_chef.jpg' },
  { category: 'INGREDIENTS', title: 'Foraging for Wild Truffles', desc: 'The delicate art of sourcing the finest truffles for our signature pasta.', date: 'SEP 15', img: '/about_detail.jpg' },
  { category: 'CHEF\'S NOTES', title: 'Balancing Sweet and Savory', desc: 'How to create harmony on the plate using unexpected flavor profiles.', date: 'AUG 30', img: '/dish_3.jpg' },
  { category: 'DINING EXPERIENCE', title: 'The Art of Wine Pairing', desc: 'Elevating the meal with thoughtfully curated selections from our cellar.', date: 'AUG 12', img: '/cta_table.jpg' },
  { category: 'VEYRA STORIES', title: 'Designing the Perfect Ambiance', desc: 'Lighting, texture, and sound: crafting the atmosphere of Veyra.', date: 'JUL 22', img: '/showcase_ambience.jpg' }
];

const ingredients = [
  { name: 'Heirloom Tomatoes', desc: 'Sourced daily from organic coastal farms for peak sweetness.', img: '/value_fresh.jpg' },
  { name: 'Artisanal Cheese', desc: 'Aged to perfection by local master cheesemakers.', img: '/dish_1.jpg' },
  { name: 'Wild Caught Seafood', desc: 'Delivered fresh every morning, sustainably harvested.', img: '/dish_2.jpg' }
];

const Content = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="content-page-v2">
      {/* 1. PREMIUM HERO */}
      <section className="journal-hero">
        <motion.div 
          className="journal-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          VEYRA JOURNAL / 01
        </motion.div>
        
        <motion.h1 
          className="journal-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          THE ART OF<br/>GOOD TASTE.
        </motion.h1>
        
        <motion.p 
          className="journal-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Stories, inspiration and the details behind the flavors that make every VEYRA experience memorable.
        </motion.p>
        
        <motion.div 
          className="journal-hero-image-wrapper"
          initial="hidden"
          animate="visible"
          variants={imageClip}
        >
          <img src="/journal_hero.png" alt="Veyra Editorial" />
        </motion.div>
      </section>

      {/* 2. FEATURED STORY */}
      <section className="journal-featured">
        <motion.div 
          className="featured-layout"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="featured-image"
            variants={imageClip}
          >
            <img src="/featured_story_chef.jpg" alt="Our Story" />
          </motion.div>
          <motion.div 
            className="featured-content"
            variants={textContainer}
          >
            <motion.div variants={fadeUp} className="featured-label">OUR STORY</motion.div>
            <motion.h2 variants={fadeUp} className="featured-title">Where Every Flavor Has a Story</motion.h2>
            <motion.p variants={fadeUp} className="featured-desc">
              Discover the philosophy that drives our menu. From the sourcing of our ingredients to the final plating, we believe that dining should be an immersive journey of the senses, rooted in tradition yet constantly evolving.
            </motion.p>
            <motion.a href="#" variants={fadeUp} className="btn-gold-solid">
              READ STORY <span style={{ marginLeft: '8px' }}>→</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. LATEST STORIES */}
      <section className="journal-grid-section">
        <div className="section-title">LATEST STORIES</div>
        <div className="journal-grid">
          {stories.map((story, idx) => (
            <motion.div 
              key={idx}
              className="story-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="card-img-wrapper">
                <img src={story.img} alt={story.title} />
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span>{story.category}</span>
                  <span>{story.date}</span>
                </div>
                <h3 className="card-title">{story.title}</h3>
                <p className="card-desc">{story.desc}</p>
                <a href="#" className="card-read-more">READ MORE <span>→</span></a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. INGREDIENTS SECTION */}
      <section className="journal-ingredients">
        <div className="ingredients-container">
          <motion.div 
            className="ingredients-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textContainer}
          >
            <motion.h2 variants={fadeUp}>FROM THE SOURCE.</motion.h2>
            <motion.p variants={fadeUp}>We believe exceptional dishes begin with exceptional ingredients.</motion.p>
          </motion.div>

          <div className="ingredients-row">
            {ingredients.map((item, idx) => (
              <motion.div 
                key={idx}
                className="ingredient-item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="ingredient-img">
                  <img src={item.img} alt={item.name} />
                </div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CHEF'S NOTE */}
      <section className="journal-chef-note">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textContainer}
        >
          <motion.div variants={fadeUp} className="chef-label">VEYRA KITCHEN</motion.div>
          <motion.h2 variants={fadeUp} className="chef-quote">
            "Great food is not simply prepared.<br/>
            It is experienced, remembered and shared."
          </motion.h2>
        </motion.div>
      </section>

      {/* 6. NEWSLETTER / FINAL CTA */}
      <section className="journal-newsletter">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textContainer}
        >
          <motion.h2 variants={fadeUp}>STAY IN THE KNOW.</motion.h2>
          <motion.p variants={fadeUp}>Discover new dishes, stories and experiences from VEYRA.</motion.p>
          
          <motion.form variants={fadeUp} className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email Address" className="newsletter-input" required />
            <button type="submit" className="btn-gold-solid">SUBSCRIBE</button>
          </motion.form>
        </motion.div>
      </section>
    </main>
  );
};

export default Content;
