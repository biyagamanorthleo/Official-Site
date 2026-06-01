import type { Metadata } from 'next';
import { getGalleryPhotos } from '@/lib/queries';
import { GALLERY_PAGE_CONTENT } from '@/constants';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Photo gallery of Leo Club of Biyagama North - BN Leos. Visual archive of community service events and projects across Biyagama, Sri Lanka.',
  keywords: ['BN Leos gallery', 'Leo Club Biyagama North photos', 'Leo Club Sri Lanka events', 'Biyagama community service photos'],
};

export const revalidate = 3600;

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <div className="bg-black pt-28 md:pt-40 pb-16 md:pb-32 min-h-screen relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-6">
        <header className="max-w-6xl mx-auto text-center mb-12 md:mb-32">
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

        <GalleryGrid photos={photos} />
      </div>
    </div>
  );
}



