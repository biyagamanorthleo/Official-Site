'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Projects', path: '/projects' },
  { name: 'Honors', path: '/achievements' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Team', path: '/team' },
  { name: 'Legacy', path: '/about' },
  { name: 'Terminal', path: '/starter-pack' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-6 pt-5">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full max-w-6xl rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-zinc-900/90 backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.8)]'
            : 'bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Brand */}
          <Link
            href="/"
            className="text-white font-black text-base tracking-[0.25em] font-heading hover:text-red-500 transition-colors"
          >
            LCBN
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors rounded-full ${
                  pathname === link.path
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/8 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              href="/about"
              className="text-white text-[11px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all active:scale-95"
            style={{ background: 'linear-gradient(to bottom, #980016 0%, #3d0009 100%)' }}
            >
              Join Us
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden rounded-b-3xl border-t border-white/5"
            >
              <div className="px-6 py-5 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-[11px] font-black tracking-widest uppercase py-3 border-b border-white/5 ${
                      pathname === link.path ? 'text-red-500' : 'text-gray-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 text-center text-white py-3 rounded-full font-black text-xs uppercase tracking-widest"
                  style={{ background: 'linear-gradient(to bottom, #980016 0%, #3d0009 100%)' }}
                >
                  Join Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
