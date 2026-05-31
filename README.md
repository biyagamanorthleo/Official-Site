# Leo Club of Biyagama North — Official Website

A modern, fully responsive React website for the **Leo Club of Biyagama North**, Leo District 306 D4 (Sri Lanka & Maldives).

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (dev server & build)
- **Tailwind CSS** (via CDN)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **React Router v7**

## Run Locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
├── index.html          # HTML entry + global CSS variables
├── App.tsx             # Router and layout
├── constants.tsx       # All site content (single source of truth)
├── types.ts            # TypeScript interfaces
├── components/         # Navbar, Footer, LoadingScreen
└── pages/              # HomePage, AboutPage, ProjectsPage, TeamPage, AchievementsPage, GalleryPage, StarterPackPage
```

All content (projects, team members, achievements, gallery) lives in `constants.tsx` — update it there to change anything on the site.
