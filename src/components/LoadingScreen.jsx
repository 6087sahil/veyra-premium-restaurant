import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lock scroll during loading screen
    document.body.style.overflow = 'hidden';

    let startTime = performance.now();
    let isAssetsLoaded = false;
    let animationFrameId;

    const minDisplayDuration = prefersReducedMotion ? 600 : 2000; // Allow elegant sequence to be appreciated
    const maxSafetyDuration = 3800; // Never block user if an asset is slow/stalled

    // Track real browser asset load
    const handleAssetsLoaded = () => {
      isAssetsLoaded = true;
    };

    if (document.readyState === 'complete') {
      handleAssetsLoaded();
    } else {
      window.addEventListener('load', handleAssetsLoaded);
    }

    // Also check document.fonts if available
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        // Fonts are ready
      }).catch(() => {});
    }

    // Smooth progress simulation that syncs with real load completion
    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;

      let targetProgress;
      if (isAssetsLoaded || elapsed >= minDisplayDuration) {
        // Accelerate smoothly to 100%
        const extraTime = Math.max(0, elapsed - minDisplayDuration);
        targetProgress = Math.min(100, 75 + (extraTime / 400) * 25);
      } else {
        // Natural ease-out progression up to 75%
        const progressRatio = Math.min(1, elapsed / minDisplayDuration);
        targetProgress = 75 * Math.sin((progressRatio * Math.PI) / 2);
      }

      // Max safety: guarantee 100% after maxSafetyDuration
      if (elapsed >= maxSafetyDuration) {
        targetProgress = 100;
      }

      setProgress((prev) => {
        const next = Math.max(prev, targetProgress);
        return next >= 100 ? 100 : next;
      });

      if (targetProgress >= 100 || elapsed >= maxSafetyDuration + 300) {
        setProgress(100);
        // Short pause at 100% before triggering cinematic exit
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = '';
        }, prefersReducedMotion ? 100 : 350);
      } else {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('load', handleAssetsLoaded);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="veyra-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(8px)',
            transition: {
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          aria-live="polite"
          aria-busy="true"
        >
          {/* Subtle Ambient Radial Backlight */}
          <div className="veyra-loader-ambient" aria-hidden="true" />

          {/* Refined Luxury Border Frame with Corner Accents */}
          <div className="veyra-loader-frame" aria-hidden="true">
            <span className="frame-corner top-left" />
            <span className="frame-corner top-right" />
            <span className="frame-corner bottom-left" />
            <span className="frame-corner bottom-right" />
          </div>

          <div className="veyra-loader-content">
            {/* 1. Restaurant Logo Crest (Smooth Opacity & Scale Animation) */}
            <motion.div
              className="veyra-loader-emblem-wrap"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg
                className="veyra-loader-emblem"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle
                  cx="36"
                  cy="36"
                  r="34"
                  stroke="url(#goldGradientOutline)"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                  opacity="0.5"
                />
                <circle
                  cx="36"
                  cy="36"
                  r="29"
                  stroke="url(#goldGradientMain)"
                  strokeWidth="1.2"
                  opacity="0.85"
                />
                {/* Crown Diamond / Star */}
                <path
                  d="M36 12L37.5 15.5L41 17L37.5 18.5L36 22L34.5 18.5L31 17L34.5 15.5L36 12Z"
                  fill="url(#goldGradientMain)"
                />
                {/* Stylized Serif V Monogram */}
                <path
                  d="M26 26H31.5L36 43.5L40.5 26H46L38.2 49H33.8L26 26Z"
                  fill="url(#goldGradientMain)"
                />
                {/* Bottom Base Flourish Accent */}
                <path
                  d="M36 53L37.2 55L36 57L34.8 55L36 53Z"
                  fill="url(#goldGradientMain)"
                />
                <defs>
                  <linearGradient id="goldGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5DEB3" />
                    <stop offset="45%" stopColor="#C49A5A" />
                    <stop offset="100%" stopColor="#8F6A30" />
                  </linearGradient>
                  <linearGradient id="goldGradientOutline" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E5C48A" />
                    <stop offset="100%" stopColor="#6E5020" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* 2. Restaurant Name (Refined Editorial Typography) */}
            <motion.h1
              className="veyra-loader-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              VEYRA
            </motion.h1>

            {/* 3. Subtle Golden Horizontal Line (Smoothly Expands Outward) */}
            <motion.div
              className="veyra-loader-divider"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />

            {/* 4. Small Tagline */}
            <motion.p
              className="veyra-loader-tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              An Experience Beyond Taste
            </motion.p>

            {/* 5. Minimal Loading Indicator & Animated Progress Line */}
            <motion.div
              className="veyra-loader-progress-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="veyra-loader-track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100">
                <div
                  className="veyra-loader-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="veyra-loader-percent">
                <span>{Math.round(progress)}</span>%
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
