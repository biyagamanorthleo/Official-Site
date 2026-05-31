'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ACHIEVEMENTS, ACHIEVEMENTS_PAGE_CONTENT } from '@/constants';
import { Trophy, Calendar, Award, ShieldCheck } from 'lucide-react';

export default function AchievementsPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-950/10 rounded-full blur-[250px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[200px] -z-10 animate-pulse" />

      <div className="container mx-auto px-6">
        <header className="max-w-6xl mx-auto text-center mb-48">
          <span className="text-red-500 font-black uppercase tracking-[0.6em] text-[10px] block mb-8">{ACHIEVEMENTS_PAGE_CONTENT.header}</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-16 tracking-tighter leading-[0.85] uppercase">
            {ACHIEVEMENTS_PAGE_CONTENT.titlePrefix} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-600 to-red-950">{ACHIEVEMENTS_PAGE_CONTENT.titleSuffix}</span>
          </h1>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed font-medium mb-12 uppercase tracking-widest max-w-4xl mx-auto">
            {ACHIEVEMENTS_PAGE_CONTENT.description}
          </p>
          <div className="w-24 h-1 bg-red-900/50 mx-auto rounded-full" />
        </header>

        <section>
          <div className="flex flex-col items-center mb-24">
            <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">{ACHIEVEMENTS_PAGE_CONTENT.awardsHeader}</span>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter flex items-center">
              <Award className="mr-6 text-red-600" size={36} /> {ACHIEVEMENTS_PAGE_CONTENT.awardsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {ACHIEVEMENTS.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-[#050505] border border-white/5 rounded-[3rem] overflow-hidden hover:border-red-600/30 transition-all duration-500 shadow-2xl"
              >
                <div className="flex flex-col md:flex-row h-full">
                  {achievement.image && (
                    <div className="md:w-1/3 relative overflow-hidden h-64 md:h-auto">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    </div>
                  )}
                  <div className={`p-10 md:p-12 flex flex-col justify-center ${achievement.image ? 'md:w-2/3' : 'w-full'}`}>
                    <div className="flex items-center text-red-500 text-[10px] font-black uppercase tracking-widest mb-6 border-l-2 border-red-600 pl-4">
                      <Calendar size={14} className="mr-2" /> {achievement.year}
                    </div>
                    <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tighter mb-4 group-hover:text-red-500 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-medium mb-8 uppercase tracking-widest">
                      {achievement.description}
                    </p>
                    <div className="flex items-center space-x-3">
                      <Trophy size={16} className="text-red-900" />
                      <span className="text-red-900 text-[10px] font-black uppercase tracking-[0.3em]">{achievement.category}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-10 right-10 text-white/5 pointer-events-none transform group-hover:scale-110 transition-transform">
                  <ShieldCheck size={120} strokeWidth={0.5} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

