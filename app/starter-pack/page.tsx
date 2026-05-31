'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RESOURCES, CONTACT_DETAILS, STARTER_PACK_PAGE_CONTENT } from '@/constants';
import { BookOpen, Users, Briefcase, ExternalLink, Download, Shield, Zap } from 'lucide-react';

const IconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BookOpen, Users, Briefcase, Shield, Zap,
};

export default function StarterPackPage() {
  return (
    <div className="bg-black pt-40 pb-32 min-h-screen relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-red-950/10 rounded-full blur-[150px] -z-10 animate-pulse" />

      <div className="container mx-auto px-6">
        <header className="max-w-5xl mx-auto text-center mb-32 relative">
          <span className="text-red-500 font-black uppercase tracking-[0.5em] text-[10px] block mb-8">{STARTER_PACK_PAGE_CONTENT.header}</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-10 tracking-tighter uppercase leading-[0.85]">
            {STARTER_PACK_PAGE_CONTENT.titlePrefix}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-600 via-red-800 to-red-950">{STARTER_PACK_PAGE_CONTENT.titleSuffix}</span>
          </h1>
          <p className="text-base text-gray-400 font-medium uppercase tracking-wider leading-relaxed max-w-2xl mx-auto">
            {STARTER_PACK_PAGE_CONTENT.description}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-20">
            {STARTER_PACK_PAGE_CONTENT.introSections.map((section, idx) => {
              const Icon = IconMap[section.icon];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="bg-[#050505] p-12 md:p-20 rounded-[3rem] border border-white/10 hover:border-red-500/30 transition-all duration-700 shadow-3xl group"
                >
                  <div className="flex items-center space-x-8 mb-12">
                    <div className="w-20 h-20 bg-red-600/10 border border-red-500/20 rounded-[1.5rem] flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                      <Icon size={40} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-2 block">{section.subtitle}</span>
                      <h2 className="text-2xl md:text-3xl font-heading font-black text-white uppercase tracking-tighter">{section.title}</h2>
                    </div>
                  </div>
                  <div className="text-base text-gray-500 leading-relaxed mb-12 font-medium uppercase tracking-wide">
                    {section.content}
                  </div>
                  <a
                    href={section.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-red-500 font-black uppercase tracking-[0.3em] text-[10px] group border-b-2 border-red-600 pb-3 hover:text-white hover:border-white transition-all"
                  >
                    Browse Records <ExternalLink size={14} className="ml-3 group-hover:rotate-45 transition-transform" />
                  </a>
                </motion.div>
              );
            })}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-48 space-y-12">
              <div className="bg-[#050505] p-12 rounded-[3rem] border border-red-500/20 shadow-3xl">
                <div className="flex items-center mb-10">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-4" />
                  <h3 className="text-xl font-heading font-black text-white uppercase tracking-tighter">{STARTER_PACK_PAGE_CONTENT.sidebarTitle}</h3>
                </div>
                <ul className="space-y-4">
                  {RESOURCES.map((resource) => (
                    <li key={resource.id}>
                      <a
                        href={resource.downloadUrl}
                        className="w-full flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group border border-white/5"
                      >
                        <div>
                          <span className="font-black text-[10px] uppercase tracking-widest text-white block mb-1">{resource.title}</span>
                          <span className="text-[8px] text-gray-500 uppercase tracking-widest">{resource.description}</span>
                        </div>
                        <Download size={18} className="text-red-500 group-hover:scale-125 transition-transform" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-900/40 to-black p-12 rounded-[3rem] border border-red-500/40 shadow-2xl text-center">
                <h3 className="text-xl font-heading font-black mb-6 uppercase tracking-tighter text-white">{STARTER_PACK_PAGE_CONTENT.contactTitle}</h3>
                <p className="text-gray-400 text-[10px] mb-10 leading-relaxed font-black uppercase tracking-[0.2em]">{CONTACT_DETAILS.email}</p>
                <a
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  className="btn-shimmer block w-full py-5 text-white rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] shadow-3xl"
                >
                  {STARTER_PACK_PAGE_CONTENT.contactBtnText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

