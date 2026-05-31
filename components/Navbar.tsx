'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CLUB_DISTRICT, HERO_CONTENT } from '@/constants';

const navLinks = [
  { name: 'Home', path: '/' },
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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 border-b ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-4 group">
          <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center font-black text-white text-xl shadow-[0_0_25px_rgba(185,28,28,0.3)] group-hover:shadow-[0_0_35px_rgba(185,28,28,0.5)] transition-all">
            L
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight text-white leading-none font-heading uppercase">
              {HERO_CONTENT.titleMain}
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-red-900 uppercase mt-0.5">
              {CLUB_DISTRICT}
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all relative group
                ${pathname === link.path ? 'text-white' : 'text-gray-400 hover:text-white'}
              `}
            >
              {link.name}
              {pathname === link.path && (
                <motion.div
                  layoutId="active-nav-line"
                  className="absolute bottom-0 left-5 right-5 h-0.5 bg-red-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <Link
            href="/about"
            className="btn-shimmer px-8 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Join the Movement
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 w-full glass-nav border-t border-white/10 shadow-2xl p-6 flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-black tracking-widest uppercase py-3 border-b border-white/5 ${
                  pathname === link.path ? 'text-red-700' : 'text-gray-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-red-800 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest mt-4"
            >
              Join Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
