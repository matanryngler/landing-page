# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Vite with HMR)
- **Build:** `npm run build` (runs `tsc -b && vite build`, outputs to `dist/`)
- **Lint:** `npm run lint` (ESLint with flat config, TypeScript + React hooks/refresh rules)
- **Preview production build:** `npm run preview`

No test framework is configured.

## Architecture

Personal portfolio landing page — single-page React + TypeScript app built with Vite.

### Component Structure

`main.tsx` → `App` → `Layout` → `BentoGrid`

- **Layout** (`src/components/Layout.tsx`) — Page shell with animated background gradients, max-width container, and footer. Uses Framer Motion for entrance animation.
- **BentoGrid** (`src/components/BentoGrid.tsx`) — The entire page content. A CSS Grid of `Block` components arranged in a bento layout (`grid-cols-3`, `auto-rows-[180px]`). Contains all sections: intro, location, socials, tech ticker, projects, experience, and email contact.
- **Block** (`src/components/Block.tsx`) — Reusable bento grid cell. Wraps children in a `motion.div` with staggered scale/opacity entrance animations and the `glass-card` style.

`Hero.tsx`, `About.tsx`, and `Portfolio.tsx` exist but are **unused** — leftover from an earlier layout iteration.

### Styling

- **Tailwind CSS v3** with PostCSS/Autoprefixer. Config in `tailwind.config.js`.
- Custom fonts: `Inter` (sans) and `Space Grotesk` (display) — set via `fontFamily` in Tailwind config.
- Custom CSS utility classes defined in `src/index.css`:
  - `glass-card` — glassmorphism effect (semi-transparent bg, backdrop blur, subtle border)
  - `text-gradient` — white-to-gray gradient text
  - `mesh-gradient` — decorative radial gradient background
  - `animate-scroll` — infinite horizontal scroll for the tech ticker
- Custom Tailwind animations: `pulse-slow`, `float` (in `tailwind.config.js`).
- Dark theme throughout — base background is `#030014`.

### Key Libraries

- **framer-motion** — entrance animations, hover effects, staggered children
- **lucide-react** — icons
- **clsx + tailwind-merge** — `cn()` utility in `src/lib/utils.ts` for conditional class merging
