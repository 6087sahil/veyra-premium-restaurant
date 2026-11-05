import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const TOTAL_LOAD_TIME_MS = 8000; // Exactly 8 seconds loading time as requested

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock page scroll during the 8s loading experience
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    let animationFrameId;

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const ratio = Math.min(1, elapsed / TOTAL_LOAD_TIME_MS);

      // Smooth progress calculation across the full 8 seconds
      const currentPercent = Math.min(100, ratio * 100);
      setProgress(currentPercent);

      if (elapsed >= TOTAL_LOAD_TIME_MS) {
        setProgress(100);
        // Brief settle at 100% before cinematic fade-out transition
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = '';
        }, 250);
      } else {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="vorera-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            transition: {
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          aria-live="polite"
          aria-busy="true"
        >
          {/* Subtle Ambient Gold Backlight from Brand Design */}
          <div className="vorera-loader-glow" aria-hidden="true" />

          <div className="vorera-loader-content">
            {/* 1. Main Brand Wordmark: High-Contrast Editorial Serif (VEYRA) */}
            <motion.h1
              className="vorera-loader-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              VEYRA
            </motion.h1>

            {/* Subtle Brand Gold Accent Line */}
            <motion.div
              className="vorera-loader-gold-line"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />

            {/* 2. Subtitle: Styled with Signature Brand Gold (#C49A5A) */}
            <motion.p
              className="vorera-loader-subtitle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              RESTAURANT
            </motion.p>

            {/* 3. Minimal Loading Indicator & Animated Progress Line in Brand Gold */}
            <motion.div
              className="vorera-loader-progress-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div
                className="vorera-loader-track"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="vorera-loader-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="vorera-loader-percent">{Math.round(progress)}%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
