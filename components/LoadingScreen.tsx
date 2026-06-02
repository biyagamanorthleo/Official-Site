'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHASES = [
  { label: 'Establishing Connection', min: 0 },
  { label: 'Parsing Document',        min: 12 },
  { label: 'Loading Styles',          min: 30 },
  { label: 'Loading Resources',       min: 45 },
  { label: 'Hydrating Components',    min: 85 },
  { label: 'Ready',                   min: 98 },
] as const;

function getPhase(pct: number) {
  for (let i = PHASES.length - 1; i >= 0; i--) {
    if (pct >= PHASES[i].min) return PHASES[i].label;
  }
  return PHASES[0].label;
}

const LoadingScreen: React.FC = () => {
  const [displayed, setDisplayed]     = useState(0);
  const [show, setShow]               = useState(true);
  const [resources, setResources]     = useState<{ loaded: number; total: number } | null>(null);

  const targetRef    = useRef(0);
  const displayedRef = useRef(0);
  const frameRef     = useRef<number | undefined>(undefined);

  function setTarget(val: number) {
    if (val <= targetRef.current) return;
    targetRef.current = val;
    scheduleAnimate();
  }

  function scheduleAnimate() {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(function step() {
      const curr = displayedRef.current;
      const tgt  = targetRef.current;
      const next = Math.min(curr + Math.max(0.5, (tgt - curr) * 0.1), tgt);
      displayedRef.current = next;
      setDisplayed(Math.floor(next));
      if (next < tgt) frameRef.current = requestAnimationFrame(step);
    });
  }

  useEffect(() => {
    setTarget(5);

    let loaded = 0;
    let total  = 0;

    function updateResources() {
      if (total === 0) return;
      const pct = 45 + (loaded / total) * 40;
      setTarget(Math.min(pct, 84));
      setResources({ loaded, total });
    }

    if ('performance' in window) {
      const existing = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      total  += existing.length;
      loaded += existing.filter(e => e.responseEnd > 0).length;
      updateResources();
    }

    let observer: PerformanceObserver | null = null;
    if ('PerformanceObserver' in window) {
      observer = new PerformanceObserver(list => {
        for (const e of list.getEntries() as PerformanceResourceTiming[]) {
          total++;
          if (e.responseEnd > 0) loaded++;
        }
        updateResources();
      });
      try { observer.observe({ type: 'resource', buffered: false }); } catch { /* unsupported */ }
    }

    function onDOMReady() { setTarget(30); }

    function onLoad() {
      observer?.disconnect();
      setTarget(88);

      const finish = () => {
        targetRef.current    = 100;
        displayedRef.current = 100;
        setDisplayed(100);
        setTimeout(() => setShow(false), 650);
      };

      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(finish, { timeout: 1500 });
      } else {
        setTimeout(finish, 500);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onDOMReady, { once: true });
      window.addEventListener('load', onLoad, { once: true });
    } else if (document.readyState === 'interactive') {
      setTarget(30);
      window.addEventListener('load', onLoad, { once: true });
    } else {
      setTimeout(() => { setTarget(88); setTimeout(onLoad, 30); }, 0);
    }

    return () => {
      observer?.disconnect();
      document.removeEventListener('DOMContentLoaded', onDOMReady);
      window.removeEventListener('load', onLoad);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const phase    = getPhase(displayed);
  const showRes  = resources && displayed >= 45 && displayed < 88;

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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[150px]" />
          </div>

          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-[12rem] md:text-[20rem] font-heading font-black text-white/5 tracking-tighter leading-none select-none"
            >
              {displayed}
            </motion.div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                key={phase}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-red-600 font-black uppercase tracking-[0.8em] text-[10px] mb-4 text-center px-4"
              >
                {phase}
              </motion.span>

              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-red-600"
                  animate={{ width: `${displayed}%` }}
                  transition={{ duration: 0.12, ease: 'linear' }}
                />
              </div>

              <span className="mt-8 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                {showRes
                  ? `${resources.loaded} / ${resources.total} resources`
                  : displayed >= 100
                  ? 'Ready'
                  : `${displayed}%`}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
