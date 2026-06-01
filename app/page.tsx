'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CLUB_STATS, PROJECTS, HERO_CONTENT, GLOBAL_CAUSES, UN_SDGS, TESTIMONIALS } from '@/constants';
import { createClient } from '@/lib/supabase/client';
import { ArrowRight, CheckCircle, Users, Clock, DollarSign, Calendar, Eye, Activity, Utensils, Heart, Leaf, AlertTriangle, Globe, GraduationCap, Star } from 'lucide-react';

const IconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  CheckCircle, Users, Clock, DollarSign,
};

const CauseIconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Eye, Activity, Utensils, Heart, Leaf, AlertTriangle, Globe, GraduationCap,
};

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<typeof PROJECTS>(PROJECTS);
  const [testimonials, setTestimonials] = useState<typeof TESTIMONIALS>(TESTIMONIALS);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setFeaturedProjects(data);
      });
    supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setTestimonials(data);
      });
  }, []);

  return (
    <div className="bg-black overflow-hidden">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image src="/herobg.webp" alt="Hero Background" fill className="object-cover" priority quality={80} />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-heading font-black mb-4 leading-[0.9] tracking-tighter uppercase">
              <span className="block text-3xl sm:text-4xl md:text-6xl">{HERO_CONTENT.titlePrefix}</span>
              <span className="block text-[clamp(2.2rem,11vw,8rem)] animate-shimmer-text">
                {HERO_CONTENT.titleMain}
              </span>
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-red-700/80 mb-10">
              Leo District 306 D4 - Sri Lanka & Maldives
            </p>
            <p className="text-sm md:text-base max-w-2xl mx-auto mb-16 text-gray-400 font-medium leading-relaxed tracking-tight">
              {HERO_CONTENT.description}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-5 md:space-y-0 md:space-x-10">
              <Link href="/projects" className="btn-shimmer w-full md:w-auto text-white px-14 py-5 rounded-full font-black text-[12px] uppercase tracking-[0.2em] shadow-2xl transition-all transform hover:scale-105 active:scale-95">
                {HERO_CONTENT.primaryBtnText}
              </Link>
              <Link href="/about" className="w-full md:w-auto bg-white/5 border border-white/10 text-white px-14 py-5 rounded-full font-black text-[12px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                {HERO_CONTENT.secondaryBtnText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 border-y border-white/5 bg-[#030303]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4">
            {CLUB_STATS.map((stat, idx) => {
              const Icon = IconMap[stat.icon];
              return (
                <div key={idx} className="text-center group">
                  <div className="text-3xl md:text-6xl font-heading font-black mb-2 text-white group-hover:text-red-500 transition-colors">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* President Spotlight */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 flex flex-col items-start justify-center pl-6 md:pl-12 select-none pointer-events-none z-0">
          <span
            className="font-heading font-black leading-none tracking-tighter"
            style={{
              fontSize: 'clamp(10rem, 28vw, 28rem)',
              background: 'linear-gradient(160deg, #5a0010 0%, #2a0007 50%, #0d0002 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            26/27
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-900/60 mt-4 pl-2">
            2026/27 Leostic Year
          </span>
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, rgba(120,0,15,0.25) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-end px-6 md:px-20 py-24 gap-10">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative group mb-8 inline-block">
              <Image src="/president.png" alt="Leo Lion Anjana Dineth MAF" width={448} height={600} priority quality={85} className="w-80 md:w-[34rem] object-contain drop-shadow-2xl" />
              <div className="absolute bottom-4 right-0 px-4 py-2 rounded-xl font-black text-[9px] tracking-[0.3em] uppercase text-white"
                style={{ background: 'linear-gradient(135deg, #980016, #3d0009)' }}>
                2026/27
              </div>
            </div>
            <span className="text-red-700 font-black uppercase tracking-[0.5em] text-[9px] mb-3">Club President</span>
            <h3 className="text-2xl md:text-3xl font-heading font-black text-white uppercase tracking-tighter leading-tight text-center md:text-left">
              Leo Lion<br />Anjana Dineth<br />
              <span className="text-red-600">MAF</span>
            </h3>
            <p className="text-gray-700 text-[10px] uppercase tracking-[0.4em] font-black mt-4">
              Leo Club of Biyagama North
            </p>
          </div>
        </div>
      </section>

      {/* Global Causes & SDGs */}
      <section className="py-40 bg-[#020202] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[200px] opacity-[0.03]"
            style={{ background: 'radial-gradient(ellipse, #ffffff 0%, transparent 70%)' }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">

          {/* Header */}
          <div className="mb-24">
            <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Lions Clubs International</span>
            <h2 className="text-4xl md:text-7xl font-heading font-black text-white leading-none uppercase mb-6">
              GLOBAL<br />CAUSES
            </h2>
            <p className="text-gray-500 text-sm max-w-xl leading-relaxed tracking-tight">
              Every project we undertake is rooted in Lions International&apos;s 8 Global Causes, each directly advancing the United Nations Sustainable Development Goals.
            </p>
          </div>

          {/* 8 Cause Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {GLOBAL_CAUSES.map((cause) => {
              const CauseIcon = CauseIconMap[cause.icon];
              const accentSdg = UN_SDGS.find(s => s.goal === cause.accentSdg);
              return (
                <motion.div
                  key={cause.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: cause.id * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-[#080808] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 transition-all duration-500"
                >
                  {/* Top border glow on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${accentSdg?.color}60, transparent)` }}
                  />

                  {/* Cause icon */}
                  <div className="mb-5 inline-flex">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5"
                      style={{ background: `${accentSdg?.color}18` }}
                    >
                      {CauseIcon && <CauseIcon size={18} style={{ color: accentSdg?.color }} />}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-black text-white text-base uppercase tracking-tight mb-3">
                    {cause.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-[11px] leading-relaxed tracking-tight flex-1 mb-6">
                    {cause.description}
                  </p>

                  {/* SDG icon badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {cause.sdgs.map((sdgGoal) => {
                      const sdg = UN_SDGS.find(s => s.goal === sdgGoal);
                      return (
                        <div key={sdgGoal} title={`SDG ${sdgGoal}: ${sdg?.name}`} className="group/sdg relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${String(sdgGoal).padStart(2, '0')}.jpg`}
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
                </motion.div>
              );
            })}
          </div>

          {/* All 17 SDGs banner */}
          <div className="border border-white/5 rounded-2xl p-8 bg-[#060606]">
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${String(sdg.goal).padStart(2, '0')}.jpg`}
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

        </div>
      </section>

      {/* Projects */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6 mb-14">
          <div className="flex flex-col md:flex-row justify-between md:items-end">
            <div>
              <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Documented Success</span>
              <h2 className="text-4xl md:text-7xl font-heading font-black text-white leading-none uppercase">PROJECTS</h2>
            </div>
            <Link href="/projects" className="group hidden md:flex items-center text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-red-900 pb-3 hover:border-white transition-all mt-10 md:mt-0">
              EXPLORE ALL <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" size={18} />
            </Link>
          </div>
        </div>

        {/* Infinite marquee carousel */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 animate-marquee w-max px-4">
            {[...featuredProjects, ...featuredProjects].map((project, i) => (
              <div key={i} className="w-80 flex-shrink-0 group">
                <div className="relative aspect-square rounded-xl overflow-hidden border border-white/5 bg-gray-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    onLoad={e => (e.currentTarget.parentElement as HTMLElement)?.classList.add('img-loaded')}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block px-1.5 py-0.5 bg-red-950/40 border border-red-900/30 text-red-400 text-[7px] font-black uppercase tracking-widest rounded mb-1.5">
                      {project.status}
                    </span>
                    <h3 className="text-[11px] font-heading font-black text-white leading-tight uppercase tracking-tight line-clamp-2">{project.title}</h3>
                    <div className="flex items-center text-gray-500 text-[8px] uppercase tracking-widest mt-1">
                      <Calendar size={8} className="mr-1" /> {project.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 mt-12 flex justify-center">
          <Link href="/projects" className="inline-flex items-center space-x-4 px-12 py-5 rounded-full border border-red-950/50 bg-red-950/5 hover:bg-red-800 transition-all group shadow-2xl">
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-white">Explore All Projects</span>
            <ArrowRight size={18} className="text-red-400 group-hover:text-white group-hover:translate-x-2 transition-all" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-[#020202] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="container mx-auto px-6">

          <div className="mb-20">
            <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Community Voices</span>
            <h2 className="text-4xl md:text-7xl font-heading font-black text-white leading-none uppercase">
              WHAT THEY<br />SAY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-[#080808] border border-white/5 rounded-2xl p-8 flex flex-col justify-between hover:border-white/10 transition-all duration-500 overflow-hidden"
              >
                {/* Decorative quote mark */}
                <span
                  className="absolute top-4 right-6 text-[7rem] leading-none font-heading font-black select-none pointer-events-none"
                  style={{ color: 'rgba(232,0,29,0.06)' }}
                  aria-hidden
                >
                  &ldquo;
                </span>

                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < t.rating ? 'text-red-500' : 'text-white/10'}
                        fill={i < t.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 text-sm leading-relaxed tracking-tight mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Person */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-black text-white"
                    style={{ background: 'linear-gradient(135deg, #980016, #3d0009)' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white font-black text-[13px] uppercase tracking-tight">{t.name}</p>
                    <p className="text-red-800 text-[9px] font-black uppercase tracking-[0.2em] mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Gallery CTA */}
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

