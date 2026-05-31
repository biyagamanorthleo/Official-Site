'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShow(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[150px] animate-pulse" />
          </div>

          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-[12rem] md:text-[20rem] font-heading font-black text-white/5 tracking-tighter leading-none select-none"
            >
              {Math.min(count, 100)}
            </motion.div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-red-600 font-black uppercase tracking-[0.8em] text-[10px] mb-4">
                Initializing Sequence
              </span>
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-red-600"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(count, 100)}%` }}
                />
              </div>
              <span className="mt-8 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                System Check: OK
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
