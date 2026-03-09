# Portfolio — Mathis Jameau

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
  ui/           → Reusable components (SectionWrapper, SkillBadge)
lib/
  data.ts       → All static content (skills, projects, links)
  variants.ts   → Framer Motion animation variants
public/images/  → Profile picture and assets
```

## Design

- Dark theme — background `#0d0d0d`
- Primary green `#5cf964`, primary blue `#577aac`
- Full-screen sections (100vh) with CSS scroll-snap
- Framer Motion animations on section entry

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
