'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

type Photo = { id: string; url: string; caption: string | null };

export default function GalleryCarousel({ photos }: { photos: Photo[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % photos.length);
  }, [photos.length]);

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (photos.length <= 1) return;
    timerRef.current = setTimeout(next, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, next, photos.length]);

  if (photos.length === 0) return null;

  return (
    <section className="py-14 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 md:mb-14">
        <div className="flex flex-col md:flex-row justify-between md:items-end">
          <div>
            <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 md:mb-6 block">Visual Moments</span>
            <h2 className="text-3xl md:text-7xl font-heading font-black text-white leading-none uppercase">GALLERY</h2>
          </div>
          <Link href="/gallery" className="group hidden md:flex items-center text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-red-900 pb-3 hover:border-white transition-all mt-10 md:mt-0">
            VIEW ALL <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" size={18} />
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#080808]"
      >
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <Image
              src={photo.url}
              alt={photo.caption ?? `Gallery photo ${i + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

            {photo.caption && (
              <div className="absolute bottom-10 left-0 right-0 flex justify-center px-6">
                <p className="text-white text-xs md:text-sm font-black uppercase tracking-[0.3em] bg-black/50 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/10">
                  {photo.caption}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Prev / Next */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 border border-white/10 hover:bg-white/10 hover:border-white/30 flex items-center justify-center text-white transition-all backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 border border-white/10 hover:bg-white/10 hover:border-white/30 flex items-center justify-center text-white transition-all backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Dots */}
        {photos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-6 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Progress bar */}
        {photos.length > 1 && (
          <div className="absolute top-0 left-0 right-0 h-px z-10 bg-white/5">
            <div
              key={current}
              className="h-full bg-red-600"
              style={{ animation: 'carousel-progress 5s linear forwards' }}
            />
          </div>
        )}
      </div>

      {/* Mobile view-all link */}
      <div className="container mx-auto px-6 mt-8 flex justify-center md:hidden">
        <Link href="/gallery" className="inline-flex items-center space-x-3 px-10 py-4 rounded-full border border-red-950/50 bg-red-950/5 hover:bg-red-800 transition-all group">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">View Full Gallery</span>
          <ArrowRight size={16} className="text-red-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      <style jsx>{`
        @keyframes carousel-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
