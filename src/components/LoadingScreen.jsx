import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lock page scroll while loading
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    let isAssetsLoaded = false;
    let animationFrameId;

    const minDisplayDuration = prefersReducedMotion ? 400 : 1800; // Time to appreciate luxury typography
    const maxSafetyDuration = 3200; // Fallback so user is never stuck

    const handleAssetsLoaded = () => {
      isAssetsLoaded = true;
    };

    if (document.readyState === 'complete') {
      handleAssetsLoaded();
    } else {
      window.addEventListener('load', handleAssetsLoaded);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {}).catch(() => {});
    }

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;

      let targetProgress;
      if (isAssetsLoaded || elapsed >= minDisplayDuration) {
        const extraTime = Math.max(0, elapsed - minDisplayDuration);
        targetProgress = Math.min(100, 75 + (extraTime / 350) * 25);
      } else {
        const progressRatio = Math.min(1, elapsed / minDisplayDuration);
        targetProgress = 75 * Math.sin((progressRatio * Math.PI) / 2);
      }

      if (elapsed >= maxSafetyDuration) {
        targetProgress = 100;
      }

      setProgress((prev) => {
        const next = Math.max(prev, targetProgress);
        return next >= 100 ? 100 : next;
      });

      if (targetProgress >= 100 || elapsed >= maxSafetyDuration + 200) {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = '';
        }, prefersReducedMotion ? 100 : 300);
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
          className="vorera-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            transition: {
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          aria-live="polite"
          aria-busy="true"
        >
          <div className="vorera-loader-content">
            {/* 1. Main Brand Wordmark: High-Contrast Editorial Serif (VEYRA) */}
            <motion.h1
              className="vorera-loader-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              VEYRA
            </motion.h1>

            {/* 2. Subtitle: Clean Wide-Spaced Sans-Serif (RESTAURANT) */}
            <motion.p
              className="vorera-loader-subtitle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              RESTAURANT
            </motion.p>

            {/* 3. Minimal Subtle Loading Indicator & Animated Progress Line */}
            <motion.div
              className="vorera-loader-progress-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
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
