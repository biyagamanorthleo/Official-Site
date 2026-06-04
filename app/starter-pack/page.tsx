'use client';

import React from 'react';
import Image from 'next/image';
import { RESOURCES, CONTACT_DETAILS, STARTER_PACK_PAGE_CONTENT, GLOBAL_CAUSES, UN_SDGS } from '@/constants';
import { BookOpen, Users, Briefcase, ExternalLink, Download, Shield, Zap, Eye, Activity, Utensils, Heart, Leaf, AlertTriangle, Globe, GraduationCap } from 'lucide-react';

const CauseIconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Eye, Activity, Utensils, Heart, Leaf, AlertTriangle, Globe, GraduationCap,
};

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
                <div key={idx} className="bg-[#050505] p-12 md:p-20 rounded-[3rem] border border-white/10 hover:border-red-500/30 transition-all duration-700 shadow-3xl group">
                  <div className="flex items-center space-x-8 mb-12">
                    <div className="w-20 h-20 bg-red-600/10 border border-red-500/20 rounded-[1.5rem] flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                      <Icon size={40} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-2 block">{section.subtitle}</span>
                      <h2 className="text-2xl md:text-3xl font-heading font-black text-white uppercase tracking-tighter">{section.title}</h2>
                    </div>
                  </div>
                  <div className="text-base text-gray-500 leading-relaxed mb-12 font-medium uppercase tracking-wide">{section.content}</div>
                  <a href={section.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-red-500 font-black uppercase tracking-[0.3em] text-[10px] group border-b-2 border-red-600 pb-3 hover:text-white hover:border-white transition-all">
                    Browse Records <ExternalLink size={14} className="ml-3 group-hover:rotate-45 transition-transform" />
                  </a>
                </div>
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
                      <a href={resource.downloadUrl} className="w-full flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group border border-white/5">
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
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="btn-shimmer block w-full py-5 text-white rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] shadow-3xl">
                  {STARTER_PACK_PAGE_CONTENT.contactBtnText}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Global Causes — what we build every project around */}
        <section className="mt-32">
          <div className="mb-16">
            <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Lions Clubs International</span>
            <h2 className="text-3xl md:text-6xl font-heading font-black text-white leading-none uppercase mb-6">
              GLOBAL<br />CAUSES
            </h2>
            <p className="text-gray-500 text-sm max-w-xl leading-relaxed tracking-tight">
              Every project we run at Leo Club of Biyagama North is rooted in one of Lions International&apos;s 8 Global Causes — this is how our local service connects to a worldwide mission and advances the UN Sustainable Development Goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {GLOBAL_CAUSES.map((cause) => {
              const CauseIcon = CauseIconMap[cause.icon];
              const accentSdg = UN_SDGS.find(s => s.goal === cause.accentSdg);
              return (
                <div
                  key={cause.id}
                  className="group relative bg-[#080808] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 hover:-translate-y-1 transition-all duration-500"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${accentSdg?.color}60, transparent)` }}
                  />
                  <div className="mb-5 inline-flex">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5"
                      style={{ background: `${accentSdg?.color}18` }}
                    >
                      {CauseIcon && <CauseIcon size={18} style={{ color: accentSdg?.color }} />}
                    </div>
                  </div>
                  <h3 className="font-heading font-black text-white text-base uppercase tracking-tight mb-3">
                    {cause.title}
                  </h3>
                  <p className="text-gray-600 text-[11px] leading-relaxed tracking-tight flex-1 mb-6">
                    {cause.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cause.sdgs.map((sdgGoal) => {
                      const sdg = UN_SDGS.find(s => s.goal === sdgGoal);
                      return (
                        <div key={sdgGoal} title={`SDG ${sdgGoal}: ${sdg?.name}`} className="group/sdg relative">
                          <Image
                            src={`/sdgs/sdg-${String(sdgGoal).padStart(2, '0')}.jpg`}
                            alt={`SDG ${sdgGoal}: ${sdg?.name}`}
                            className="w-8 h-8 rounded-sm object-cover opacity-75 group-hover/sdg:opacity-100 transition-opacity duration-200"
                            loading="lazy"
                            width={32}
                            height={32}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border border-white/5 rounded-2xl p-5 md:p-8 bg-[#060606]">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-shrink-0">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 block mb-2">Committed to</span>
                <p className="text-white font-heading font-black text-xl uppercase leading-tight">
                  All 17<br />UN SDGs
                </p>
              </div>
              <div className="hidden md:block h-12 w-px bg-white/5 flex-shrink-0" />
              <div className="flex flex-wrap gap-2">
                {UN_SDGS.map((sdg) => (
                  <div key={sdg.goal} title={`SDG ${sdg.goal}: ${sdg.name}`}>
                    <Image
                      src={`/sdgs/sdg-${String(sdg.goal).padStart(2, '0')}.jpg`}
                      alt={`SDG ${sdg.goal}: ${sdg.name}`}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-sm object-cover opacity-70 hover:opacity-100 transition-opacity duration-200"
                      loading="lazy"
                      width={48}
                      height={48}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
