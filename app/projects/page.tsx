import { getProjects } from '@/lib/queries';
import { PROJECTS_PAGE_CONTENT } from '@/constants';
import ProjectsClient from './ProjectsClient';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="bg-black min-h-screen pt-40 pb-32 relative overflow-hidden">
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

        <ProjectsClient projects={projects} />
      </div>
    </div>
  );
}
