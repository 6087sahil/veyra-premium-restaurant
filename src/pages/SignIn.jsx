import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './SignIn.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="signin-page">
      <div className="signin-container">
        
        {/* Left Column: Image */}
        <motion.div 
          className="signin-image-col"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src="/signin-chef.png" alt="Veyra Dining Experience" className="signin-img" />
          <div className="signin-overlay"></div>
          <div className="signin-image-content">
            <span className="signin-brand">VEYRA</span>
            <p className="signin-statement">Experience culinary excellence.<br/>Your table awaits.</p>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <div className="signin-form-col">
          <motion.div 
            className="signin-form-wrapper"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.h1 variants={fadeUp} className="signin-heading">WELCOME BACK.</motion.h1>
            <motion.p variants={fadeUp} className="signin-subtitle">Sign in to continue your VEYRA experience.</motion.p>
            
            <motion.form variants={fadeUp} className="signin-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    placeholder="Enter your password" 
                    required 
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>

              <button type="submit" className="btn-gold-solid signin-submit-btn">
                SIGN IN
              </button>
            </motion.form>

            <motion.div variants={fadeUp} className="signin-divider">
              <span>OR</span>
            </motion.div>

            <motion.button variants={fadeUp} className="google-auth-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </motion.button>

            <motion.p variants={fadeUp} className="signin-footer-text">
              Don't have an account? <a href="#">Create account</a>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
