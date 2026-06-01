import type { Metadata } from 'next';
import { getPresidents } from '@/lib/queries';
import { ABOUT_CONTENT } from '@/constants';
import { Target, Shield, Award, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Legacy',
  description: 'The legacy and history of Leo Club of Biyagama North - BN Leos. Hall of honor, past presidents, and the mission of our Leo Club in Biyagama, Sri Lanka.',
  keywords: ['Leo Club Biyagama North history', 'BN Leos legacy', 'Biyagama North Leo Club presidents', 'Leo District 306 D4 history'],
};

const IconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Target, Shield, Award,
};

export const revalidate = 3600;

export default async function AboutPage() {
  const presidents = await getPresidents();

  return (
    <div className="bg-black pt-28 md:pt-40 pb-16 md:pb-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-950/10 rounded-full blur-[180px] -z-10 animate-pulse" />

      <div className="container mx-auto px-6">
        <section className="max-w-6xl mx-auto text-center mb-12 md:mb-24">
          <span className="text-red-500/80 font-black uppercase tracking-[0.6em] text-[10px] block mb-8">{ABOUT_CONTENT.header}</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-10 tracking-tighter leading-[0.85] uppercase">
            THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-600 via-red-800 to-red-950">{ABOUT_CONTENT.titleSuffix}</span>
          </h1>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed font-medium mb-20 uppercase tracking-widest max-w-4xl mx-auto">
            {ABOUT_CONTENT.intro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left border-y border-white/10 py-20">
            {ABOUT_CONTENT.pillars.map((pillar, idx) => {
              const Icon = IconMap[pillar.icon];
              return (
                <div key={idx} className="group">
                  <div className="w-14 h-14 bg-red-900/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-heading font-black mb-4 uppercase tracking-tight text-white">{pillar.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium uppercase tracking-wider">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="flex flex-col items-center mb-24">
          <div className="w-px h-16 bg-gradient-to-b from-red-500/50 to-transparent mb-6" />
          <div className="px-6 py-2 border border-red-500/20 rounded-full bg-red-500/5 backdrop-blur-md">
            <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[8px]">Est. {new Date().getFullYear() - 9} - Present</span>
          </div>
        </div>

        <section className="py-12 md:py-32 bg-[#030303] rounded-[2rem] md:rounded-[3.5rem] border border-white/5 relative">
          <div className="container mx-auto px-8">
            <header className="text-center mb-12 md:mb-32">
              <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Command History</span>
              <h2 className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter uppercase">HALL OF HONOR</h2>
              <div className="w-16 h-1 bg-red-600 mx-auto mt-8 rounded-full opacity-50" />
            </header>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-red-600 opacity-20 hidden md:block" />
              <div className="space-y-16 md:space-y-48">
                {presidents.map((pres, idx) => (
                  <div key={pres.id} className={`flex flex-col md:flex-row items-center justify-center relative ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-red-600 rounded-full border-2 border-black shadow-[0_0_15px_rgba(239,68,68,0.8)] hidden md:block z-10" />
                    <div className="md:w-1/2 flex justify-center">
                      <div className="relative group p-3 bg-black border border-white/10 rounded-[2.5rem] transition-all duration-700 hover:border-red-500/40">
                        <div className="img-skeleton relative w-56 h-56 md:w-72 md:h-72 rounded-[2rem] bg-[#0a0a0a]">
                          {pres.photo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={pres.photo} alt={pres.name} className="absolute inset-0 w-full h-full object-cover rounded-[2rem] grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" loading="lazy" />
                          ) : (
                            <div className="absolute inset-0 rounded-[2rem] flex items-center justify-center border border-white/5">
                              <span className="font-heading font-black text-white/10 text-6xl uppercase">{pres.name.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-red-600 text-white px-6 py-2.5 rounded-xl font-black text-[9px] tracking-[0.3em] uppercase">{pres.year}</div>
                      </div>
                    </div>
                    <div className={`md:w-1/2 mt-16 md:mt-0 ${idx % 2 === 0 ? 'md:pl-24 text-center md:text-left' : 'md:pr-24 text-center md:text-right'}`}>
                      <h3 className="text-2xl font-heading font-black text-white mb-3 uppercase tracking-tighter leading-none">{pres.name}</h3>
                      <p className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6">North President {pres.year}</p>
                      <p className="text-gray-500 text-xs max-w-sm mx-auto md:mx-0 leading-relaxed font-medium uppercase tracking-widest">{pres.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-40 text-center">
          <div className="inline-block p-8 bg-red-600/10 border border-red-500/20 rounded-[2.5rem] text-red-500 mb-10">
            <Globe size={48} className="animate-pulse" />
          </div>
          <h2 className="text-2xl md:text-4xl font-heading font-black mb-6 uppercase tracking-tighter text-white">{ABOUT_CONTENT.footerTitle}</h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed uppercase tracking-[0.2em] font-black text-xs">{ABOUT_CONTENT.footerText}</p>
        </section>
      </div>
    </div>
  );
}



