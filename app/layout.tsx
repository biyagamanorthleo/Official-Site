import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import SiteShell from '@/components/SiteShell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Leo Club of Biyagama North | BN Leos | District 306 D4',
    template: '%s | Leo Club of Biyagama North',
  },
  description:
    'Leo Club of Biyagama North - BN Leos. A premier Leo Club in Biyagama, Sri Lanka under Leo District 306 D4 (Sri Lanka & Maldives). Dedicated to leadership, service, and community excellence.',
  keywords: [
    'Leo Club of Biyagama North',
    'BN Leos',
    'Biyagama North Leos',
    'Leo District 306 D4',
    'Leo Club Biyagama',
    'Biyagama North',
    'Biyagama',
    'Leos of Sri Lanka',
    'Leo Club Sri Lanka',
    'Lions Club Sri Lanka',
    'Leo District 306D4',
    'Leo Club Western Province',
    'Youth Leadership Sri Lanka',
    'Community Service Sri Lanka',
    'LCBN',
  ],
  authors: [{ name: 'Leo Club of Biyagama North' }],
  creator: 'Leo Club of Biyagama North',
  publisher: 'Leo Club of Biyagama North',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Leo Club of Biyagama North',
    title: 'Leo Club of Biyagama North | BN Leos | District 306 D4',
    description:
      'BN Leos - Leo Club of Biyagama North. A premier youth leadership club in Biyagama, Sri Lanka. Leo District 306 D4.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leo Club of Biyagama North | BN Leos',
    description:
      'BN Leos - Leo Club of Biyagama North. Youth leadership & community service. Leo District 306 D4, Sri Lanka.',
  },
  category: 'community organization',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} bg-black`}>
      <body
        className="bg-black text-white selection:bg-red-600 selection:text-white"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

