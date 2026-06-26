'use client';

import React, { useState } from 'react';
import RetryImage from '@/components/RetryImage';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, X, TrendingUp } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  description: string;
  long_description: string;
  status: string;
  image: string;
  date: string;
  impact: string | null;
};

const tabs = ['All', 'Completed', 'Ongoing', 'Coming Soon'] as const;

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeTab === 'All' ? projects : projects.filter(p => p.status === activeTab);

  return (
    <>
      <div className="flex justify-center mb-10 md:mb-32">
        <div className="inline-flex items-center bg-white/[0.03] border border-white/8 rounded-full p-1 gap-0.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-[9px] font-black tracking-[0.25em] uppercase transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                  : 'text-ink-muted hover:text-ink-muted'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((project) => (
          <div key={project.id} className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
            <div className="img-skeleton relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] group-hover:border-red-500/50 transition-all duration-700">
              <RetryImage
                src={project.image}
                alt={project.title}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover grayscale opacity-40 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center text-red-500 text-[9px] font-black uppercase tracking-[0.3em] mb-2">
                  <Calendar size={10} className="mr-2" /> {project.date}
                </div>
                <h3 className="text-sm font-heading font-black text-white leading-tight uppercase tracking-tight group-hover:text-red-400 transition-colors mb-2">
                  {project.title}
                </h3>
                <span className={`inline-block px-2 py-0.5 border text-[7px] font-black uppercase tracking-widest rounded ${
                  project.status === 'Completed'
                    ? 'bg-white/5 border-white/15 text-white/60'
                    : project.status === 'Coming Soon'
                    ? 'bg-red-950/30 border-red-900/20 text-red-800'
                    : 'bg-red-600/20 border-red-500/30 text-red-400'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-5xl bg-[#050505] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_0_120px_rgba(239,68,68,0.15)] flex flex-col md:flex-row h-[90vh] md:h-[85vh] border border-white/10"
            >
              <button onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-20 w-14 h-14 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all hover:rotate-90">
                <X size={24} />
              </button>
              <div className="md:w-1/2 relative h-44 md:h-full overflow-hidden border-r border-white/5">
                <RetryImage
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2 p-7 md:p-16 overflow-y-auto">
                <div className="px-4 py-1.5 bg-red-600/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-lg inline-block mb-10">
                  {selectedProject.status}
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-10 leading-[0.9] uppercase tracking-tighter">
                  {selectedProject.title}
                </h2>
                <div className="grid grid-cols-2 gap-8 mb-12 border-y border-white/5 py-10">
                  <div>
                    <p className="text-[10px] font-black text-ink-muted uppercase tracking-widest mb-2">Deployed</p>
                    <p className="font-bold text-ink-muted flex items-center"><Calendar size={14} className="mr-2 text-red-500" /> {selectedProject.date}</p>
                  </div>
                  {selectedProject.impact && (
                    <div>
                      <p className="text-[10px] font-black text-ink-muted uppercase tracking-widest mb-2">Metrics</p>
                      <p className="font-bold text-ink-muted flex items-center"><TrendingUp size={14} className="mr-2 text-red-500" /> {selectedProject.impact}</p>
                    </div>
                  )}
                </div>
                <div className="mb-12">
                  <h4 className="text-[10px] font-black text-red-500 mb-6 uppercase tracking-[0.4em]">Official Narrative</h4>
                  <p className="leading-relaxed text-ink-muted text-base font-medium">{selectedProject.long_description}</p>
                </div>
                <button className="btn-shimmer w-full text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl transition-transform hover:scale-[1.02]">
                  Join Next Mission
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
