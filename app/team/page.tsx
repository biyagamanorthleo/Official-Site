'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TEAM, TEAM_PAGE_CONTENT } from '@/constants';
import { TeamMember, TeamCategory } from '@/types';
import { Instagram, Linkedin, Facebook, Shield, Users, Building } from 'lucide-react';

const IconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ADVISORY: Building,
  EXECUTIVE: Shield,
  DIRECTOR: Users,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function MemberCard({ member, size = 'md' }: { member: TeamMember; size?: 'lg' | 'md' }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
      className={`group ${size === 'lg' ? 'md:col-span-2' : ''}`}
    >
      <div className={`relative ${size === 'lg' ? 'aspect-[1/1] md:aspect-[16/10]' : 'aspect-[4/5]'} rounded-[3rem] overflow-hidden mb-10 border border-white/5 bg-[#0a0a0a] shadow-3xl group-hover:border-red-500/30 transition-all duration-700`}>
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover grayscale opacity-50 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-14">
          <div className="flex space-x-4">
            {member.socials.instagram && (
              <a href={member.socials.instagram} className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all border border-white/10"><Instagram size={20} /></a>
            )}
            {member.socials.linkedin && (
              <a href={member.socials.linkedin} className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all border border-white/10"><Linkedin size={20} /></a>
            )}
            {member.socials.facebook && (
              <a href={member.socials.facebook} className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all border border-white/10"><Facebook size={20} /></a>
            )}
          </div>
        </div>
      </div>
      <div className="text-center px-6">
        <h3 className={`${size === 'lg' ? 'text-2xl md:text-3xl' : 'text-xl'} font-heading font-black text-white mb-2 leading-tight uppercase tracking-tight group-hover:text-red-500 transition-colors`}>
          {member.name}
        </h3>
        <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.35em] block opacity-80">
          {member.position}{member.avenue && <span className="text-gray-500 ml-2">â€” {member.avenue}</span>}
        </span>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-black pt-40 pb-40 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/10 rounded-full blur-[180px] -z-10 animate-pulse" />

      <div className="container mx-auto px-6">
        <header className="mb-48 text-center relative">
          <span className="text-red-500/80 font-black uppercase tracking-[0.6em] text-[11px] block mb-10">{TEAM_PAGE_CONTENT.header}</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter uppercase leading-[0.85]">
            {TEAM_PAGE_CONTENT.titlePrefix} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-600 via-red-800 to-red-950">{TEAM_PAGE_CONTENT.titleSuffix}</span>
          </h1>
        </header>

        {TEAM_PAGE_CONTENT.sections.map((section) => {
          const Icon = IconMap[section.category as keyof typeof IconMap] || Users;
          const members = TEAM.filter((m) =>
            m.category.toUpperCase().includes(section.category.toUpperCase())
          );

          if (section.category === 'DIRECTOR') {
            const groupedByAvenue = members.reduce((acc, curr) => {
              const avenue = curr.avenue || 'General';
              if (!acc[avenue]) acc[avenue] = [];
              acc[avenue].push(curr);
              return acc;
            }, {} as Record<string, TeamMember[]>);

            return (
              <section key={section.title} className="mb-64">
                <div className="flex flex-col items-center mb-32">
                  <div className="p-5 bg-red-900/10 border border-red-500/20 rounded-[1.5rem] text-red-500 mb-10 shadow-2xl">
                    <Icon size={32} />
                  </div>
                  <h2 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tight text-white mb-6">{section.title}</h2>
                  <div className="h-1 w-20 bg-red-600 rounded-full" />
                </div>

                <div className="space-y-48">
                  {Object.entries(groupedByAvenue).map(([avenue, avenueMembers]) => (
                    <div key={avenue}>
                      <div className="flex items-center space-x-6 mb-16 border-l-4 border-red-900 pl-8">
                        <span className="text-red-500 font-black text-xs uppercase tracking-[0.5em]">{avenue}</span>
                      </div>
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-32"
                      >
                        {avenueMembers
                          .sort((a, b) => (a.priority || 99) - (b.priority || 99))
                          .map((member) => (
                            <MemberCard key={member.id} member={member} />
                          ))}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          return (
            <section key={section.title} className="mb-64">
              <div className="flex flex-col items-center mb-32">
                <div className="p-5 bg-red-900/10 border border-red-500/20 rounded-[1.5rem] text-red-500 mb-10 shadow-2xl">
                  <Icon size={32} />
                </div>
                <h2 className="text-2xl md:text-4xl font-heading font-black uppercase tracking-tight text-white mb-6">{section.title}</h2>
                <div className="h-1 w-20 bg-red-600 rounded-full" />
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-32"
              >
                {members
                  .sort((a, b) => (a.priority || 99) - (b.priority || 99))
                  .map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      size={section.category === 'EXECUTIVE' && member.position.includes('President') ? 'lg' : 'md'}
                    />
                  ))}
              </motion.div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

