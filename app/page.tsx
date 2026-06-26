'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CLUB_STATS, PROJECTS, HERO_CONTENT, TESTIMONIALS } from '@/constants';
import { createClient } from '@/lib/supabase/client';
import { ArrowRight, CheckCircle, Users, Clock, DollarSign, Calendar, Star } from 'lucide-react';
import GalleryCarousel from '@/components/GalleryCarousel';
import AboutOrgs from '@/components/AboutOrgs';

const IconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  CheckCircle, Users, Clock, DollarSign,
};

// Used for the skewed hero panels until gallery photos load (or if the gallery is empty)
const FALLBACK_PANELS = ['/president.webp', '/lions-history.webp', '/herobg.webp', '/sdgs/sdg-04.jpg', '/sdgs/sdg-13.jpg'];

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<typeof PROJECTS>(PROJECTS);
  const [testimonials, setTestimonials] = useState<typeof TESTIMONIALS>(TESTIMONIALS);
  const [carouselPhotos, setCarouselPhotos] = useState<{ id: string; url: string; caption: string | null }[]>([]);
  const [panelPhotos, setPanelPhotos] = useState<string[] | null>(null);

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
    supabase
      .from('gallery_photos')
      .select('id, url, caption')
      .eq('featured_in_carousel', true)
      .order('sort_order', { ascending: true })
      .limit(7)
      .then(({ data }) => {
        if (data && data.length > 0) setCarouselPhotos(data);
      });
    supabase
      .from('gallery_photos')
      .select('url')
      .order('sort_order', { ascending: true })
      .limit(5)
      .then(({ data }) => {
        const urls = (data ?? []).map((p) => p.url).filter(Boolean);
        setPanelPhotos(
          urls.length > 0
            ? Array.from({ length: 5 }, (_, i) => urls[i % urls.length])
            : FALLBACK_PANELS,
        );
      });
  }, []);

  return (
    <div className="bg-black overflow-hidden">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#080002] to-black" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-[700px] h-[700px] rounded-full blur-[150px] opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(152,0,22,0.85) 0%, transparent 70%)' }}
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />
          {/* Skewed gallery panels dropping in from the top on load */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-[25%] -top-[10%] flex h-[120%] w-[150%] skew-x-[-18deg]">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="relative flex-1 overflow-hidden">
                  {panelPhotos && (
                    <div
                      className="absolute inset-0 animate-panel-drop"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    >
                      <div className="absolute inset-0 skew-x-[18deg] scale-[1.15]">
                        <Image src={i === 1 ? '/img1.jpg' : i === 2 ? '/img3.jpg' : i === 3 ? '/img2.jpg' : panelPhotos[i]} alt="" fill sizes="(max-width: 768px) 60vw, 40vw" quality={85} className={`object-cover grayscale ${i === 3 ? 'object-[65%_center]' : 'object-center'}`} />
                      </div>
                    </div>
                  )}
                  {/* Black shadow fading in from the top and bottom */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
                  {/* Diagonal divider line, fading to black at both ends */}
                  <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="animate-hero-in translate-y-24">
            <h1 className="font-heading font-black mb-4 leading-[0.9] tracking-tighter uppercase">
              <span className="block text-3xl sm:text-4xl md:text-6xl text-white">{HERO_CONTENT.titlePrefix}</span>
              <span className="block whitespace-nowrap text-[8.5vw] sm:text-[clamp(2.2rem,11vw,8rem)] bg-gradient-to-b from-[#e02828] via-[#9c1422] to-[#5c0a16] bg-clip-text text-transparent">
                {HERO_CONTENT.titleMain}
              </span>
            </h1>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5">
              <Link href="/projects" className="btn-shimmer w-auto text-white px-8 py-3 md:px-14 md:py-5 rounded-full font-black text-[10px] md:text-[12px] uppercase tracking-[0.2em] shadow-2xl transition-all transform hover:scale-105 active:scale-95">
                {HERO_CONTENT.primaryBtnText}
              </Link>
              <Link href="/about" className="w-auto bg-white/5 border border-white/10 text-white px-8 py-3 md:px-14 md:py-5 rounded-full font-black text-[10px] md:text-[12px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                {HERO_CONTENT.secondaryBtnText}
              </Link>
            </div>
          </div>
        </div>
        {/* Red divider marking the end of the hero */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-black via-red-600 to-black shadow-[0_0_8px_rgba(232,0,29,0.3)]" />
      </section>

      {/* Stats */}
      <section className="py-14 md:py-24 border-y border-white/5 bg-[#030303]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {CLUB_STATS.map((stat, idx) => {
              const Icon = IconMap[stat.icon];
              return (
                <div key={idx} className="text-center group">
                  <div className="text-3xl md:text-6xl font-heading font-black mb-2 text-white group-hover:text-red-500 transition-colors">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-ink-muted text-[10px] uppercase tracking-[0.3em] font-black">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Lions & Leo */}
      <AboutOrgs />

      {/* President Spotlight */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden bg-black">
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
              <Image src="/president.webp" alt="Leo Lion Anjana Dineth MAF" width={448} height={600} priority quality={85} className="w-80 md:w-[34rem] object-contain drop-shadow-2xl" />
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
            <p className="text-ink-muted text-[10px] uppercase tracking-[0.4em] font-black mt-4">
              Leo Club of Biyagama North
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Carousel */}
      {carouselPhotos.length > 0 && <GalleryCarousel photos={carouselPhotos} />}

      {/* Projects */}
      <section className="py-14 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 mb-8 md:mb-14">
          <div className="flex flex-col md:flex-row justify-between md:items-end">
            <div>
              <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 md:mb-6 block">Documented Success</span>
              <h2 className="text-3xl md:text-7xl font-heading font-black text-white leading-none uppercase">PROJECTS</h2>
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
              <div key={i} className="w-72 md:w-96 flex-shrink-0 group">
                <div className="relative aspect-square rounded-xl overflow-hidden border border-white/5 bg-gray-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 224px, 320px"
                    className="object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block px-1.5 py-0.5 bg-red-950/40 border border-red-900/30 text-red-400 text-[7px] font-black uppercase tracking-widest rounded mb-1.5">
                      {project.status}
                    </span>
                    <h3 className="text-[11px] font-heading font-black text-white leading-tight uppercase tracking-tight line-clamp-2">{project.title}</h3>
                    <div className="flex items-center text-ink-muted text-[8px] uppercase tracking-widest mt-1">
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
      <section className="py-16 md:py-32 bg-[#020202] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="container mx-auto px-6">

          <div className="mb-10 md:mb-20">
            <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Community Voices</span>
            <h2 className="text-3xl md:text-7xl font-heading font-black text-white leading-none uppercase">
              WHAT THEY<br />SAY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t, idx) => (
              <div
                key={t.id}
                className="group relative bg-[#080808] border border-white/5 rounded-2xl p-5 md:p-8 flex flex-col justify-between hover:border-white/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
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
                  <p className="text-ink-muted text-sm leading-relaxed tracking-tight mb-8">
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
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

