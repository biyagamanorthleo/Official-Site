'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, PROJECTS_PAGE_CONTENT } from '@/constants';
import { ProjectStatus, Project } from '@/types';
import { Calendar, X, TrendingUp } from 'lucide-react';

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<ProjectStatus | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeTab === 'All' ? PROJECTS : PROJECTS.filter((p) => p.status === activeTab);

  const tabs: (ProjectStatus | 'All')[] = [
    'All',
    ProjectStatus.COMPLETED,
    ProjectStatus.ONGOING,
    ProjectStatus.UPCOMING,
  ];

  return (
    <div className="bg-black min-h-screen pt-56 pb-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-6">
        <header className="mb-32 text-center max-w-5xl mx-auto">
          <span className="text-red-500/80 font-black uppercase tracking-[0.5em] text-[10px] block mb-8">{PROJECTS_PAGE_CONTENT.header}</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-10 tracking-tighter uppercase leading-[0.85]">
            {PROJECTS_PAGE_CONTENT.titlePrefix} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-600 via-red-800 to-red-950">{PROJECTS_PAGE_CONTENT.titleSuffix}</span>
          </h1>
          <p className="text-gray-400 text-base font-medium leading-relaxed uppercase tracking-wider max-w-2xl mx-auto">
            {PROJECTS_PAGE_CONTENT.description}
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-4 mb-32">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-500 border ${
                activeTab === tab
                  ? 'bg-red-600 border-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.3)]'
                  : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="group cursor-pointer flex flex-col"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden mb-10 border border-white/10 bg-[#0a0a0a] shadow-3xl group-hover:border-red-500/50 transition-all duration-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-40 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  <div className="absolute top-8 left-8">
                    <span className="inline-block px-4 py-1 bg-red-600/20 border border-red-500/30 text-red-400 text-[9px] font-black uppercase tracking-widest rounded-lg">
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-12 left-10 right-10">
                    <div className="flex items-center text-red-500 text-[9px] font-black uppercase tracking-[0.3em] mb-4">
                      <Calendar size={12} className="mr-3" /> {project.date}
                    </div>
                    <h3 className="text-2xl font-heading font-black text-white leading-tight uppercase tracking-tight group-hover:text-red-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-5xl bg-[#050505] rounded-[4rem] overflow-hidden shadow-[0_0_120px_rgba(239,68,68,0.15)] flex flex-col md:flex-row max-h-[85vh] border border-white/10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-20 w-14 h-14 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all hover:rotate-90"
              >
                <X size={24} />
              </button>

              <div className="md:w-1/2 h-80 md:h-auto overflow-hidden border-r border-white/5">
                <img src={selectedProject.image} className="w-full h-full object-cover" alt={selectedProject.title} />
              </div>

              <div className="md:w-1/2 p-12 md:p-16 overflow-y-auto">
                <div className="flex items-center space-x-4 mb-10">
                  <div className="px-4 py-1.5 bg-red-600/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-lg">
                    {selectedProject.status}
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-10 leading-[0.9] uppercase tracking-tighter">
                  {selectedProject.title}
                </h2>
                <div className="grid grid-cols-2 gap-8 mb-12 border-y border-white/5 py-10">
                  <div>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Deployed</p>
                    <p className="font-bold text-gray-200 flex items-center"><Calendar size={14} className="mr-2 text-red-500" /> {selectedProject.date}</p>
                  </div>
                  {selectedProject.impact && (
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Metrics</p>
                      <p className="font-bold text-gray-200 flex items-center"><TrendingUp size={14} className="mr-2 text-red-500" /> {selectedProject.impact}</p>
                    </div>
                  )}
                </div>
                <div className="mb-12">
                  <h4 className="text-[10px] font-black text-red-500 mb-6 uppercase tracking-[0.4em]">Official Narrative</h4>
                  <p className="leading-relaxed text-gray-400 text-base font-medium">{selectedProject.longDescription}</p>
                </div>
                <button className="btn-shimmer w-full text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl transition-transform hover:scale-[1.02]">
                  Join Next Mission
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
