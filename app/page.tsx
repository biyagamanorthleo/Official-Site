'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CLUB_STATS, PROJECTS, HERO_CONTENT } from '@/constants';
import { ArrowRight, CheckCircle, Users, Clock, DollarSign, Calendar } from 'lucide-react';

const IconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  CheckCircle, Users, Clock, DollarSign,
};

export default function HomePage() {
  const recentProjects = PROJECTS.slice(0, 3);

  return (
    <div className="bg-black overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_CONTENT.backgroundImage}
            alt="Leo Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[180px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-black mb-4 leading-[0.9] tracking-tighter uppercase">
              {HERO_CONTENT.titlePrefix} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-600 via-red-800 to-red-950 text-glow">
                {HERO_CONTENT.titleMain.split(' ')[0]} <br className="md:hidden" />
                {HERO_CONTENT.titleMain.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-red-700/80 mb-10">
              Leo District 306 D4 — Sri Lanka &amp; Maldives
            </p>
            <p className="text-sm md:text-base max-w-2xl mx-auto mb-16 text-gray-400 font-medium leading-relaxed tracking-tight">
              {HERO_CONTENT.description}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-5 md:space-y-0 md:space-x-10">
              <Link
                href="/projects"
                className="btn-shimmer w-full md:w-auto text-white px-14 py-5 rounded-full font-black text-[12px] uppercase tracking-[0.2em] shadow-2xl transition-all transform hover:scale-105 active:scale-95"
              >
                {HERO_CONTENT.primaryBtnText}
              </Link>
              <Link
                href="/about"
                className="w-full md:w-auto bg-white/5 border border-white/10 text-white px-14 py-5 rounded-full font-black text-[12px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
              >
                {HERO_CONTENT.secondaryBtnText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-[#030303]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4">
            {CLUB_STATS.map((stat, idx) => {
              const Icon = IconMap[stat.icon];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center group"
                >
                  <div className="text-3xl md:text-6xl font-heading font-black mb-2 text-white group-hover:text-red-500 transition-colors">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32">
            <div className="max-w-2xl">
              <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Documented Success</span>
              <h2 className="text-4xl md:text-7xl font-heading font-black text-white leading-none uppercase">PROJECTS</h2>
            </div>
            <Link href="/projects" className="group hidden md:flex items-center text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-red-900 pb-3 hover:border-white transition-all mt-10 md:mt-0">
              EXPLORE ALL <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 mb-24">
            {recentProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-10 border border-white/5 bg-gray-900 shadow-3xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-60 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12">
                    <span className="inline-block px-3 py-1 bg-red-950/40 border border-red-900/30 text-red-400 text-[9px] font-black uppercase tracking-widest rounded-lg mb-4">
                      {project.status}
                    </span>
                    <h3 className="text-2xl font-heading font-black text-white leading-tight uppercase tracking-tight">{project.title}</h3>
                    <div className="flex items-center text-gray-500 text-[10px] uppercase tracking-widest mt-4">
                      <Calendar size={12} className="mr-2" /> {project.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center space-x-4 px-12 py-5 rounded-full border border-red-950/50 bg-red-950/5 hover:bg-red-800 transition-all group shadow-2xl"
              >
                <span className="text-[12px] font-black uppercase tracking-[0.2em] text-white">Explore All Projects</span>
                <ArrowRight size={18} className="text-red-400 group-hover:text-white group-hover:translate-x-2 transition-all" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-40 bg-[#020202] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-950/10 rounded-full blur-[150px] -z-10 animate-pulse" />
        <div className="container mx-auto px-6 text-center">
          <span className="text-red-600 font-black uppercase tracking-[0.6em] text-[10px] mb-12 block">Visual History</span>
          <h2 className="text-4xl md:text-8xl font-heading font-black text-white mb-20 tracking-tighter uppercase leading-[0.85]">
            Relive the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-600 via-red-800 to-red-950">Impactful moments</span>
          </h2>
          <Link href="/gallery" className="group inline-flex flex-col items-center">
            <div className="relative w-32 h-32 md:w-48 md:h-48 border border-red-950/50 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-red-600 transition-all duration-700">
              <ArrowRight size={48} className="text-red-900 group-hover:text-red-600 group-hover:rotate-[-45deg] transition-all duration-700" />
              <div className="absolute inset-0 rounded-full border-2 border-red-600/0 border-t-red-600 group-hover:rotate-180 transition-all duration-[1.5s]" />
            </div>
            <span className="text-white font-black uppercase tracking-[0.4em] text-xs">Enter Gallery</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
