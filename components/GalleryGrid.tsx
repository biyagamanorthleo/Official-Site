'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import RetryImage from '@/components/RetryImage';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type Photo = {
  id: string;
  url: string;
  caption: string | null;
};

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex(i => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
    [photos.length]
  );
  const next = useCallback(
    () => setLightboxIndex(i => (i !== null ? (i + 1) % photos.length : null)),
    [photos.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-[1.5rem] bg-zinc-900 border border-white/5 focus:outline-none"
          >
            <RetryImage
              src={photo.url}
              alt={photo.caption ?? 'Gallery photo'}
              fill
              loading={i < 4 ? 'eager' : 'lazy'}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-10 left-10 right-10 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">Service Archive</span>
              <p className="text-white text-xs font-bold uppercase tracking-widest mt-2">
                {photo.caption ?? 'Biyagama North Legacy'}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          {photos.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div
            className="relative w-full max-w-4xl px-14 md:px-20 flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ height: 'min(75vh, 640px)' }}>
              <RetryImage
                src={photos[lightboxIndex].url}
                alt={photos[lightboxIndex].caption ?? 'Gallery photo'}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-contain"
              />
            </div>
            {photos[lightboxIndex].caption && (
              <p className="text-ink-muted text-sm font-bold uppercase tracking-widest mt-5 text-center">
                {photos[lightboxIndex].caption}
              </p>
            )}
            <p className="text-ink-muted text-[11px] tracking-widest mt-2">
              {lightboxIndex + 1} / {photos.length}
            </p>
          </div>

          {photos.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
