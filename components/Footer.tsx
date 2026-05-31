import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Heart, ExternalLink, ArrowRight } from 'lucide-react';
import { CLUB_NAME, CONTACT_DETAILS, SOCIAL_LINKS, FOOTER_CONTENT, CLUB_DISTRICT } from '@/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-32 pb-16 relative overflow-hidden border-t border-red-950/30">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-950/10 rounded-full blur-[120px] -z-10 animate-pulse" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 lg:gap-24 mb-24 pb-24 border-b border-white/5">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-red-800 flex items-center justify-center font-black text-white text-2xl rounded-2xl shadow-[0_0_30px_rgba(153,27,27,0.3)]">
                L
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tighter uppercase leading-none">{CLUB_NAME}</h2>
                <p className="text-[10px] text-red-900 font-bold tracking-[0.2em] uppercase mt-1">{CLUB_DISTRICT}</p>
              </div>
            </div>
            <p className="text-gray-500 mb-8 leading-relaxed font-medium text-sm uppercase tracking-wide max-w-sm">
              {FOOTER_CONTENT.tagline}
            </p>
            <div className="flex space-x-4">
              <a href={SOCIAL_LINKS.facebook} className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-900/50 hover:border-red-900/50 transition-all">
                <Facebook size={18} />
              </a>
              <a href={SOCIAL_LINKS.instagram} className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-900/50 hover:border-red-900/50 transition-all">
                <Instagram size={18} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-900/50 hover:border-red-900/50 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-red-700 font-black uppercase tracking-[0.5em] text-[10px] mb-10">Exploration</h3>
            <ul className="space-y-4">
              <li><Link href="/projects" className="text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest block">Impact Portfolio</Link></li>
              <li><Link href="/achievements" className="text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest block">Honors Hall</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest block">Visual Archive</Link></li>
              <li><Link href="/team" className="text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest block">Governance</Link></li>
              <li><Link href="/starter-pack" className="text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest block">The Terminal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-red-700 font-black uppercase tracking-[0.5em] text-[10px] mb-10">Direct Link</h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 group">
                <ExternalLink size={14} className="text-red-900 mt-1 flex-shrink-0" />
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="text-gray-400 group-hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest break-all leading-relaxed">
                  {CONTACT_DETAILS.email}
                </a>
              </li>
              <li className="flex items-start space-x-4">
                <ExternalLink size={14} className="text-red-900 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-relaxed">{CONTACT_DETAILS.address}</span>
              </li>
              <li className="flex items-start space-x-4">
                <ExternalLink size={14} className="text-red-900 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-relaxed">{CONTACT_DETAILS.phone}</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-red-700 font-black uppercase tracking-[0.5em] text-[10px] mb-10">{FOOTER_CONTENT.subscriptionHeading}</h3>
            <p className="text-gray-400 mb-6 text-xs font-medium uppercase tracking-wider italic">{FOOTER_CONTENT.subscriptionSubtext}</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="INIT@DOMAIN.COM"
                className="bg-zinc-900 border border-white/5 px-5 py-4 rounded-xl text-[10px] font-black tracking-widest focus:outline-none focus:border-red-900/50 w-full uppercase transition-all"
              />
              <button className="bg-red-950 border border-red-900/50 p-4 rounded-xl text-white hover:bg-red-800 transition-all flex-shrink-0">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-gray-600 text-[9px] font-black uppercase tracking-[0.2em]">
          <p className="text-center md:text-left">© {new Date().getFullYear()} {CLUB_NAME}. {FOOTER_CONTENT.copyrightText}</p>
          <p className="flex items-center text-center md:text-left">
            CRAFTED WITH <Heart size={14} className="mx-2 text-red-950 fill-current" /> {FOOTER_CONTENT.craftedBy}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
