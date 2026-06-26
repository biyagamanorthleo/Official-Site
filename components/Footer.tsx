import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { CLUB_NAME, CONTACT_DETAILS, SOCIAL_LINKS, CLUB_DISTRICT } from '@/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white border-t border-white/5">

      {/* Main footer content */}
      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-heading font-black text-white tracking-widest">LCBN</span>
              <p className="text-xs text-red-700 font-semibold mt-1 tracking-wide">{CLUB_DISTRICT}</p>
            </Link>
            <p className="text-ink-muted text-sm leading-relaxed mb-8 max-w-xs">
              Forging leaders, gaining experience, and creating opportunity across Sri Lanka and the Maldives.
            </p>
            <div className="flex gap-3">
              <a href={SOCIAL_LINKS.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-ink-muted hover:text-white hover:bg-red-900/40 hover:border-red-900/40 transition-all">
                <Facebook size={16} />
              </a>
              <a href={SOCIAL_LINKS.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-ink-muted hover:text-white hover:bg-red-900/40 hover:border-red-900/40 transition-all">
                <Instagram size={16} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-ink-muted hover:text-white hover:bg-red-900/40 hover:border-red-900/40 transition-all">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-red-700 mb-6">Pages</h3>
            <ul className="space-y-3">
              {[
                { label: 'Projects', href: '/projects' },
                { label: 'Achievements', href: '/achievements' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Team', href: '/team' },
                { label: 'Legacy', href: '/about' },
                { label: 'Starter Pack', href: '/starter-pack' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}
                    className="text-ink-muted hover:text-white transition-colors text-sm font-medium block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-red-700 mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-red-800 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${CONTACT_DETAILS.email}`}
                  className="text-ink-muted hover:text-white transition-colors text-sm break-all">
                  {CONTACT_DETAILS.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-red-800 mt-0.5 flex-shrink-0" />
                <span className="text-ink-muted text-sm">{CONTACT_DETAILS.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-red-800 mt-0.5 flex-shrink-0" />
                <span className="text-ink-muted text-sm">{CONTACT_DETAILS.address}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-red-700 mb-6">Stay Updated</h3>
            <p className="text-ink-muted text-sm mb-5 leading-relaxed">
              Subscribe to the North Star bulletin for updates and announcements.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-black border border-white/10 px-4 py-3 rounded-lg text-sm text-white placeholder-ink-muted focus:outline-none focus:border-red-800 transition-all"
              />
              <button
                className="px-4 py-3 rounded-lg text-white text-sm font-bold flex-shrink-0 transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-ink-muted text-sm">
            © {new Date().getFullYear()} {CLUB_NAME}. All rights reserved.
          </p>
          <p className="text-ink-muted text-sm">
            Leo District 306 D4 - Sri Lanka & Maldives
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
