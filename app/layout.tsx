import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

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
  title: 'Leo Club of Biyagama North | District 306 D4',
  description:
    'A premier community of young leaders dedicated to service, professional growth, and collective excellence. Leo District 306 D4 — Sri Lanka & Maldives.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} bg-black`}>
      <body
        className="bg-black text-white selection:bg-red-600 selection:text-white"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        <div className="flex flex-col min-h-screen">
          <LoadingScreen />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
