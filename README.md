# Portfolio — Mathis Jameau

**[mathisjameau-portfolio.vercel.app](https://mathisjameau-portfolio.vercel.app/)**

Personal portfolio built with Next.js, Tailwind CSS, Motion, Three.js and GSAP.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Motion (Framer Motion)** — section animations, staggered reveals, blur-in effects
- **Three.js / React Three Fiber** — Beams background (custom shaders)
- **GSAP** — FlowingMenu component

## Structure

```
app/            → Pages and global styles
components/
  sections/     → Hero, About, Skills, Projects, Contact
  ui/           → Beams (Three.js), FlowingMenu (GSAP), Header, PageIntro, ProjectCard
lib/
  data.ts       → All static content (skills, projects, links)
  variants.ts   → Framer Motion animation variants
public/images/  → Profile picture and project screenshots
```

## Design

- Dark theme — pure black `#000` / `#050505` backgrounds
- Accent green `#5cf964`
- Full-screen sections (100vh) with CSS scroll-snap
- Three.js animated beams in Hero section
- GSAP-powered FlowingMenu for Projects (marquee on hover, descriptions in green)
- Green radial halos on section backgrounds
- Side-panel navigation with clip-path circle reveal
- MJ monogram intro animation (SVG stroke draw)
- Responsive: mobile-first, separate mobile/desktop layouts where needed

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
