'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderOpen, Trophy, Image, Users, Star, LogOut, ExternalLink, MessageSquare, BookOpen, UserCheck, Menu, X } from 'lucide-react';

const navItems = [
  { href: '/admin',              label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/admin/projects',     label: 'Projects',       icon: FolderOpen },
  { href: '/admin/team',         label: 'Team',           icon: Users },
  { href: '/admin/achievements', label: 'Achievements',   icon: Trophy },
  { href: '/admin/gallery',      label: 'Gallery',        icon: Image },
  { href: '/admin/presidents',   label: 'Hall of Honor',  icon: Star },
  { href: '/admin/testimonials', label: 'Testimonials',   icon: MessageSquare },
  { href: '/admin/blog',         label: 'Blog Approvals', icon: BookOpen },
  { href: '/admin/members',      label: 'Members',        icon: UserCheck },
];

export default function AdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer whenever navigation changes the route.
  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function isActive(href: string) {
    return href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
  }

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="p-6 lg:p-8 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-heading font-black text-white tracking-widest">LCBN</span>
            <p className="text-red-800 text-[9px] font-black uppercase tracking-[0.3em] mt-1">Admin Panel</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="lg:hidden text-ink-muted hover:text-white p-1"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <Link href="/" target="_blank" rel="noopener noreferrer"
          className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl text-ink-muted hover:text-white text-[10px] font-black uppercase tracking-widest border border-white/5 hover:border-white/15 transition-all">
          <ExternalLink size={12} /> View Site
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-widest group ${
              isActive(href) ? 'text-white bg-white/5' : 'text-ink-muted hover:text-white hover:bg-white/5'
            }`}>
            <Icon size={16} className={`transition-colors ${isActive(href) ? 'text-red-500' : 'group-hover:text-red-500'}`} />
            {label}
          </Link>
        ))}
      </nav>
      <form action="/api/auth/signout" method="POST" className="p-4 border-t border-white/5">
        <button type="submit" className="flex items-center gap-3 px-4 py-3 rounded-xl text-ink-muted hover:text-red-500 transition-all text-xs font-bold uppercase tracking-widest w-full">
          <LogOut size={16} /> Sign Out
        </button>
      </form>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-[#050505] border-b border-white/5 px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-ink-muted hover:text-white border border-white/10 hover:border-white/20 transition-all"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <div className="text-center">
          <span className="text-base font-heading font-black text-white tracking-widest">LCBN</span>
          <p className="text-red-800 text-[8px] font-black uppercase tracking-[0.3em] -mt-0.5">Admin Panel</p>
        </div>
        {/* Spacer to balance the hamburger button */}
        <div className="w-9" />
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#050505] border-r border-white/5 flex-col flex-shrink-0">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-72 max-w-[85%] bg-[#050505] border-r border-white/5 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {sidebar}
        </aside>
      </div>
    </>
  );
}
