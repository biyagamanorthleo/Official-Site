'use client';

import React from 'react';
import { GALLERY_PHOTOS, GALLERY_PAGE_CONTENT } from '@/constants';

export default function GalleryPage() {
  return (
    <div className="bg-black pt-40 pb-32 min-h-screen relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-6">
        <header className="max-w-6xl mx-auto text-center mb-32">
          <span className="text-red-500 font-black uppercase tracking-[0.6em] text-[10px] block mb-8">{GALLERY_PAGE_CONTENT.header}</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-10 tracking-tighter leading-[0.85] uppercase">
            {GALLERY_PAGE_CONTENT.titlePrefix} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-600 to-red-950">{GALLERY_PAGE_CONTENT.titleSuffix}</span>
          </h1>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed font-medium mb-12 uppercase tracking-widest max-w-4xl mx-auto">
            {GALLERY_PAGE_CONTENT.description}
          </p>
          <div className="w-24 h-1 bg-red-900/50 mx-auto rounded-full" />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_PHOTOS.map((photo, idx) => (
            <div key={idx} className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/5">
              <img src={photo} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-10 left-10 right-10 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">Service Archive</span>
                <p className="text-white text-xs font-bold uppercase tracking-widest mt-2">Biyagama North Legacy</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
