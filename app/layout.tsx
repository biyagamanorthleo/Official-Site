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
  weight: ['700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lcbn.org'),
  title: {
    default: 'Leo Club of Biyagama North | BN Leos | District 306 D4',
    template: '%s | Leo Club of Biyagama North',
  },
  description:
    'Leo Club of Biyagama North (LCBN) - BN Leos. A premier Leo Club in Biyagama, Sri Lanka under Leo District 306 D4 (Sri Lanka & Maldives). Dedicated to leadership, service, and community excellence.',
  keywords: [
    'Leo Club of Biyagama North',
    'Leo Club of',
    'BN Leos',
    'LCBN',
    'LCBA',
    'Biyagama North Leos',
    'Leo District 306 D4',
    'Leo District 306D4',
    'Leo Club Biyagama',
    'Biyagama North',
    'Biyagama',
    'Biyagama Metro',
    'Biyagama Alliance',
    'Biyagama Allaianze',
    'Gampaha Leo',
    'Sri Lanka Leo',
    'Leos',
    'Leos of Sri Lanka',
    'Leo Club Sri Lanka',
    'Lions',
    'Lions Club Sri Lanka',
    'Lions Club of Biyagama Metro',
    'Lions Club of Biyagama Metri',
    'Leo Club Western Province',
    'Youth Leadership Sri Lanka',
    'Community Service Sri Lanka',
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
    url: 'https://lcbn.org',
    locale: 'en_US',
    siteName: 'Leo Club of Biyagama North',
    title: 'Leo Club of Biyagama North | BN Leos | District 306 D4',
    description:
      'BN Leos - Leo Club of Biyagama North (LCBN). A premier youth leadership club in Biyagama, Sri Lanka. Leo District 306 D4.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leo Club of Biyagama North | BN Leos | LCBN',
    description:
      'BN Leos - LCBN. Leo Club of Biyagama North. Youth leadership & community service. Leo District 306 D4, Sri Lanka.',
  },
  alternates: {
    canonical: 'https://lcbn.org',
  },
  category: 'community organization',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Leo Club of Biyagama North',
  alternateName: ['LCBN', 'BN Leos', 'LCBA', 'Biyagama North Leos'],
  url: 'https://lcbn.org',
  description:
    'Leo Club of Biyagama North (LCBN) - BN Leos. A premier youth service organization under Leo District 306 D4, Sri Lanka & Maldives, dedicated to leadership, service, and community excellence in Biyagama.',
  areaServed: {
    '@type': 'Place',
    name: 'Biyagama, Gampaha, Sri Lanka',
  },
  memberOf: [
    {
      '@type': 'Organization',
      name: 'Leo District 306 D4',
    },
    {
      '@type': 'Organization',
      name: 'Lions Club of Biyagama Metro',
    },
  ],
  location: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Biyagama North',
      addressRegion: 'Western Province',
      addressCountry: 'LK',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} bg-black`}>
      <body
        className="bg-black text-white selection:bg-red-600 selection:text-white"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

