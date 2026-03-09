# Portfolio — Mathis Jameau

**[mathisjameau-portfolio.vercel.app](https://mathisjameau-portfolio.vercel.app/)**

Personal portfolio built with Next.js, Tailwind CSS, and Framer Motion.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Motion (Framer Motion)**

## Structure

```
app/            → Pages and global styles
components/
  sections/     → Hero, About, Skills, Projects, Contact
  ui/           → Reusable components (SectionWrapper, CursorFollower, AnimatedBackground…)
lib/
  data.ts       → All static content (skills, projects, links)
  variants.ts   → Framer Motion animation variants
public/images/  → Profile picture and assets
```

## Design

- Dark theme — background `#0d0d0d`, section overlay `#180c4959`
- Accent green `#5cf964` (lime)
- Full-screen sections (100vh) with CSS scroll-snap
- Lime-shaped cursor follower, floating SVG shapes with mouse repulsion
- Framer Motion animations (fadeUp, revealUp) retriggered on each scroll

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
