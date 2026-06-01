import type { Metadata } from 'next';
import Image from 'next/image';
import { getTeamMembers } from '@/lib/queries';
import { TEAM_PAGE_CONTENT } from '@/constants';
import { Instagram, Linkedin, Facebook, Shield, Users, Building, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Leadership Team',
  description: 'Meet the leadership team of Leo Club of Biyagama North - BN Leos. Executive committee, directors, and advisory panel of our Leo Club in Biyagama, Sri Lanka.',
  keywords: ['BN Leos team', 'Leo Club Biyagama North members', 'Leo Club Biyagama leadership', 'Biyagama North Leo executives'],
};

const SectionIcon: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ADVISORY: Building,
  EXECUTIVE: Shield,
  DIRECTOR: Users,
  MEMBER: Star,
};

type Member = {
  id: string;
  name: string;
  position: string;
  photo: string;
  category: string;
  avenue: string | null;
  priority: number;
  instagram: string | null;
  linkedin: string | null;
  facebook: string | null;
};

function MemberCard({ member, size = 'md' }: { member: Member; size?: 'lg' | 'md' }) {
  return (
    <div className={`group ${size === 'lg' ? 'md:col-span-2' : ''}`}>
      <div className={`relative ${size === 'lg' ? 'aspect-[3/2]' : 'aspect-[3/4]'} rounded-2xl overflow-hidden mb-4 border border-white/5 bg-[#0a0a0a] group-hover:border-red-500/30 transition-all duration-700`}>
        <Image loading="lazy" fill src={member.photo} alt={member.name} className="object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-5">
          <div className="flex space-x-2">
            {member.instagram && <a href={member.instagram} className="w-8 h-8 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all border border-white/10"><Instagram size={14} /></a>}
            {member.linkedin && <a href={member.linkedin} className="w-8 h-8 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all border border-white/10"><Linkedin size={14} /></a>}
            {member.facebook && <a href={member.facebook} className="w-8 h-8 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all border border-white/10"><Facebook size={14} /></a>}
          </div>
        </div>
      </div>
      <div className="text-center px-2">
        <h3 className={`${size === 'lg' ? 'text-lg md:text-xl' : 'text-sm'} font-heading font-black text-white mb-1 leading-tight uppercase tracking-tight group-hover:text-red-500 transition-colors`}>
          {member.name}
        </h3>
        <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.3em] block opacity-80">
          {member.position}{member.avenue && <span className="text-gray-500 ml-1"> {member.avenue}</span>}
        </span>
      </div>
    </div>
  );
}

export const revalidate = 3600;

export default async function TeamPage() {
  const allMembers = await getTeamMembers();

  return (
    <div className="min-h-screen bg-black pt-40 pb-40 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/10 rounded-full blur-[180px] -z-10 animate-pulse" />

      <div className="container mx-auto px-6">
        <header className="mb-20 text-center">
          <span className="text-red-500/80 font-black uppercase tracking-[0.6em] text-[11px] block mb-10">{TEAM_PAGE_CONTENT.header}</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter uppercase leading-[0.85]">
            {TEAM_PAGE_CONTENT.titlePrefix} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-600 via-red-800 to-red-950">{TEAM_PAGE_CONTENT.titleSuffix}</span>
          </h1>
        </header>

        {TEAM_PAGE_CONTENT.sections.map((section) => {
          const Icon = SectionIcon[section.category] || Users;
          const members = allMembers.filter(m => m.category.toUpperCase().includes(section.category));

          if (section.category === 'DIRECTOR' || section.category === 'MEMBER') {
            const byAvenue = members.reduce<Record<string, Member[]>>((acc, m) => {
              const key = m.avenue || 'General';
              if (!acc[key]) acc[key] = [];
              acc[key].push(m);
              return acc;
            }, {});

            return (
              <section key={section.title} className="mb-24">
                <div className="flex flex-col items-center mb-10">
                  <div className="p-5 bg-red-900/10 border border-red-500/20 rounded-[1.5rem] text-red-500 mb-10"><Icon size={32} /></div>
                  <h2 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tight text-white mb-6">{section.title}</h2>
                  <div className="h-1 w-20 bg-red-600 rounded-full" />
                </div>
                <div className="space-y-16">
                  {Object.entries(byAvenue).map(([avenue, avenueMembers]) => (
                    <div key={avenue}>
                      <div className="flex items-center space-x-6 mb-6 border-l-4 border-red-900 pl-6">
                        <span className="text-red-500 font-black text-xs uppercase tracking-[0.5em]">{avenue}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {avenueMembers.sort((a, b) => a.priority - b.priority).map(m => <MemberCard key={m.id} member={m} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          return (
            <section key={section.title} className="mb-24">
              <div className="flex flex-col items-center mb-10">
                <div className="p-5 bg-red-900/10 border border-red-500/20 rounded-[1.5rem] text-red-500 mb-10"><Icon size={32} /></div>
                <h2 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tight text-white mb-6">{section.title}</h2>
                <div className="h-1 w-20 bg-red-600 rounded-full" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {members.sort((a, b) => a.priority - b.priority).map(m => (
                  <MemberCard key={m.id} member={m} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}



