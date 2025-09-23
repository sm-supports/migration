# SM Supports — Website Documentation

This document describes the structure, development workflow, and conventions used by the SM Supports website.

## Repo overview
- Framework: Next.js App Router (React + TypeScript)
- Styling: Tailwind CSS
- Directory highlights:
  - `app/` — Next.js App Router pages and root layout
  - `components/` — UI components and sections used across pages
  - `public/` — static assets (images, icons, manifest)
  - `src/` — legacy Vite app (some files remain from earlier scaffolding)
  - `components/ui/` — shared UI primitives (Button, Card, Modal)

## Local development
1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

> Note: This repo contains both Next.js and leftover Vite files. Use the Next.js scripts for development and deployment.

## Adding content and docs
- Knowledge Base entries are defined in `components/sections/knowledge-base.tsx` as a `docs` array. Each entry has:
  - `title`, `description`, `category`, `details[]`, and `icon`.
- To add a new doc entry, add an object to that array and optionally create a dedicated docs page or markdown file in `/docs`.

## Modal component
- `components/ui/Modal.tsx` is a small client-only modal used by the Knowledge Base "Read More" action.
- It supports Escape key to close and backdrop click to dismiss.

## Third-party widgets
- Trustpilot is loaded client-side only from the footer to avoid hydration mismatches.
- Tawk.to widget is loaded client-side via `components/TawkToWidget`.

## Building & deploying
- Production build:

```bash
npm run build
npm start
```

- Deploy to platforms that support Next.js (Vercel, Netlify with adapter, etc.).

## Conventions
- Use `components/ui/*` for small reusable UI primitives.
- Prefer client components (`'use client'`) for interactive logic and hooks.
- Keep third-party DOM-mutating scripts inside `useEffect` or injected post-hydration.

## Troubleshooting
- If you see repeated requests for `/prompts.json` or `content.js` with HTML returned, test in a clean browser profile—these are often injected by browser extensions (e.g., Tag Assistant).
- If hydration errors occur (UI mismatch), check for DOM mutations in components that run during render. Move DOM calls to `useEffect` or client-only components.

## Contact
For questions about the site or documentation, open an issue in the repo or use the contact form on the site (`/contact`).
