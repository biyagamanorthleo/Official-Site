'use client';

import { usePathname } from 'next/navigation';
import LoadingScreenWrapper from './LoadingScreenWrapper';
import Navbar from './Navbar';
import Footer from './Footer';
import BackgroundMusic from './BackgroundMusic';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith('/admin') || pathname.startsWith('/member')) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <LoadingScreenWrapper />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <BackgroundMusic />
    </div>
  );
}
