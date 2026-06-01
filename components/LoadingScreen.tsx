'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Loading screen stays up until the browser fires window.load AND at least
// MIN_MS has elapsed — so fonts, hero image, and all non-lazy assets are
// ready before we let the user see the page.
const MIN_MS = 1500;

const LoadingScreen: React.FC = () => {
  const [count, setCount]   = useState(0);
  const [show, setShow]     = useState(true);
  const startRef            = useRef(Date.now());
  const intervalRef         = useRef<ReturnType<typeof setInterval> | null>(null);
  const finishedRef         = useRef(false);

  useEffect(() => {
    // Crawl the counter up to 88 % while we wait for the real load event.
    intervalRef.current = setInterval(() => {
      setCount(prev => {
        if (prev >= 88) {
          clearInterval(intervalRef.current!);
          return 88;
        }
        return Math.min(prev + Math.floor(Math.random() * 9) + 3, 88);
      });
    }, 110);

    function finish() {
      if (finishedRef.current) return;
      finishedRef.current = true;

      clearInterval(intervalRef.current!);

      const elapsed   = Date.now() - startRef.current;
      const remaining = Math.max(0, MIN_MS - elapsed);

      // Wait out the minimum display time, then snap to 100 and fade out.
      setTimeout(() => {
        setCount(100);
        setTimeout(() => setShow(false), 650);
      }, remaining);
    }

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      clearInterval(intervalRef.current!);
      window.removeEventListener('load', finish);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[150px] animate-pulse" />
          </div>

          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-[12rem] md:text-[20rem] font-heading font-black text-white/5 tracking-tighter leading-none select-none"
            >
              {count}
            </motion.div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-red-600 font-black uppercase tracking-[0.8em] text-[10px] mb-4">
                Initializing Sequence
              </span>

              {/* Progress bar tied to actual count */}
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-red-600"
                  animate={{ width: `${count}%` }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                />
              </div>

              <span className="mt-8 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                {count < 100 ? 'Loading Assets...' : 'Ready'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
