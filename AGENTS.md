# Lambda CDMO Website — Agent Guide

This document is intended for AI coding agents working on the Lambda CDMO project. It describes the project architecture, technology stack, conventions, and how to build, test, and deploy the site.

---

## Project Overview

Lambda CDMO is a marketing and informational website for a biologics Contract Development and Manufacturing Organization (CDMO). The site is a single-page-app-style experience built on the Next.js App Router. It presents Lambda's services, capabilities, facility, leadership, and therapeutic modalities, and provides a contact form for technical inquiries.

Key characteristics:

- **Static site**: All pages are prerendered at build time using `next build`.
- **Dynamic route pages**: `src/app/[category]/[slug]/page.tsx` generates 25+ content pages from a single local data file (`src/data/cdmoData.ts`).
- **Client-side animations**: Heavy use of Framer Motion for scroll reveals, hero animations, tabs, and the custom cursor.
- **No backend or database**: Contact form submissions are simulated on the client; there is no API or database layer.
- **No automated tests**: The project currently has no test suite configured.

---

## Technology Stack

| Layer | Technology | Version / Notes |
|-------|------------|-----------------|
| Framework | Next.js | 16.2.9 (App Router) |
| React | React & React DOM | 19.2.4 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 via `@tailwindcss/postcss` |
| UI Components | shadcn/ui-style | Radix Slot + `class-variance-authority` |
| Animation | Framer Motion | Also `motion` package alias |
| Icons | Lucide React | `lucide-react` |
| Font | Self-hosted woff | D-DIN (regular, italic, bold) from `public/fonts/` |
| Package Manager | npm | `package-lock.json` present |

---

## Project Structure

```text
D:/projects/Lamda-CDMO
├── public/                    # Static assets (images, SVG logo, video files)
│   ├── images/                # Hero, benefit, modality, logo images
│   ├── videos/                # Background video assets
│   └── cta-bg-video.mp4
├── src/
│   ├── app/                   # Next.js App Router routes
│   │   ├── [category]/[slug]/page.tsx   # Dynamic content pages
│   │   ├── contact/page.tsx             # Contact form
│   │   ├── layout.tsx                   # Root layout, fonts, metadata
│   │   ├── page.tsx                     # Home page
│   │   ├── globals.css                  # Tailwind entry + custom CSS
│   │   └── not-found.tsx                # 404 page
│   ├── components/            # React components
│   │   ├── ui/                # Reusable shadcn/ui-style primitives
│   │   │   ├── button.tsx
│   │   │   ├── hero-section-5.tsx
│   │   │   ├── infinite-slider.tsx
│   │   │   └── progressive-blur.tsx
│   │   ├── Navigation.tsx     # Site nav with dropdowns + mobile menu
│   │   ├── Footer.tsx
│   │   ├── CustomCursor.tsx  # Custom mouse cursor (desktop only)
│   │   ├── CinematicCTA.tsx   # Full-width video CTA section
│   │   ├── ServicesTabs.tsx   # Interactive service tabs
│   │   ├── Reveal.tsx         # Scroll-reveal wrapper
│   │   ├── Button.tsx         # Custom branded button
│   │   ├── Badge.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── Parallax3DCard.tsx
│   │   ├── AccordionItem.tsx
│   │   ├── ScrollZigzagLine.tsx
│   │   ├── FormButton.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── StatCard.tsx
│   │   ├── MobileMenu.tsx
│   │   └── Tabs.tsx
│   ├── data/                  # Static content data
│   │   ├── cdmoData.ts        # 25+ dynamic page records
│   │   ├── faqs.ts            # Home page FAQ items
│   │   ├── articles.ts        # Article/blog entries
│   │   └── projects.ts        # Portfolio project entries
│   └── lib/
│       └── utils.ts           # `cn()` Tailwind class merger
├── .next/                     # Next.js build output (ignored)
├── .gitignore
├── AGENTS.md                  # This file
├── CLAUDE.md                  # Points to AGENTS.md
├── GEMINI.MD                  # Original design brief / spec
├── README.md                  # create-next-app default README
├── eslint.config.mjs          # ESLint 9 flat config using Next presets
├── next.config.ts             # Next.js config (default/empty)
├── next-env.d.ts              # Next.js types (do not edit)
├── package.json
├── package-lock.json
├── postcss.config.mjs          # Tailwind PostCSS plugin
└── tsconfig.json
```

---

## Build and Development Commands

All commands run from the repository root:

```bash
# Install dependencies
npm install

# Start the development server (Turbopack by default)
npm run dev
# Site: http://localhost:3000

# Build the production site
npm run build

# Start the production server (requires build first)
npm run start

# Run ESLint
npm run lint
```

### Build Output

- `next build` compiles the site and emits to `.next/`.
- The dynamic `[category]/[slug]` route uses `generateStaticParams()` to prerender all pages from `cdmoData.ts` at build time.
- The current build produces 29 static routes (home, contact, 25 dynamic pages, 404).

---

## Code Style and Conventions

### TypeScript

- Strict mode is enabled (`tsconfig.json` -> `"strict": true`).
- Module resolution is `"bundler"`.
- Path alias `@/*` resolves to `src/*`.
- Prefer explicit types for component props and data shapes.

### Tailwind CSS v4

- Tailwind v4 is configured via CSS rather than a JS config file.
- Entry file: `src/app/globals.css` uses `@import "tailwindcss";`.
- Custom theme values are registered with `@theme` in `globals.css` (fonts, colors, radii).
- Custom brand tokens:
  - `--brand-navy: #0f2231`
  - `--brand-navy-light: #1b3a4f`
  - `--brand-navy-muted: #3a5a6f`
  - `--brand-blue: #00aeef` (logo blue)
  - `--brand-blue-hover: #0099d0`
  - `--brand-orange: #f58634` (logo orange)
  - `--brand-orange-hover: #d9731f`
  - `--brand-yellow: #f58634` (mapped to logo orange)
- Custom utility classes (e.g., `.dark-glass-card`, `.liquid-glass`, `.mobile-menu-glass`) live in `globals.css`.

### Components

- **Two button systems exist**: a custom branded `Button.tsx` and a shadcn/ui-style `ui/button.tsx` that uses `cva`. Check which one is already imported before adding a new button pattern.
- **Client components**: Any component using React hooks, Framer Motion, browser APIs, or event handlers must start with `'use client';`.
- **Server components**: Layout and the dynamic `[category]/[slug]` page are server components by default and fetch data from the local `cdmoData` array.

### Data

- All content is static and stored in `src/data/`.
- `cdmoData.ts` is the source of truth for dynamic pages. The shape is `CDMOPage`.
- The `category` + `slug` pair in `cdmoData.ts` must match the route path `/{category}/{slug}`.
- `generateStaticParams()` in `src/app/[category]/[slug]/page.tsx` must be updated if new categories or slugs are added.

### Naming and File Conventions

- PascalCase for component files and component names (e.g., `Navigation.tsx`).
- kebab-case for data/content slugs and route parameters (e.g., `cell-line`, `drug-substance`).
- `page.tsx` for route files, `layout.tsx` for layouts, `not-found.tsx` for 404s.

---

## Testing Instructions

There is currently no test framework configured in this project. There are no unit tests, integration tests, or E2E tests.

To verify changes before committing:

1. Run `npm run lint` to check for ESLint issues.
2. Run `npm run build` to ensure the project compiles and all dynamic routes can be statically generated.
3. Run `npm run dev` and manually verify pages in the browser at `http://localhost:3000`.

If you add a test framework, update this section and `package.json` accordingly.

---

## Deployment

The project is designed as a static Next.js site and can be deployed on:

- **Vercel** (recommended for Next.js; zero-config from `main`/`master` branch).
- **Any static host** by exporting with `output: 'export'` in `next.config.ts` if a fully static file build is required.

Current `next.config.ts` is empty/default. Add explicit config only if deployment requires it (e.g., image optimization, rewrites, headers, or export path).

No environment variables or secrets are required for the current build.

---

## Security Considerations

- **No real backend**: The contact form simulates a submission with `setTimeout` and does not send data anywhere. If you wire it to a real endpoint, validate all inputs server-side and protect against spam/abuse.
- **No auth**: There is no authentication, authorization, or session handling.
- **External images**: Several components load images from `https://images.unsplash.com` and `https://images.pexels.com`. If you add a strict Content Security Policy, allowlist these domains or move assets to `/public`.
- **Client-side code**: Because the site is mostly static, do not place secrets or API keys in client components. Use server-side Next.js features or environment variables only if a backend is introduced.
- **Custom cursor**: `CustomCursor.tsx` reads `window` and `document` inside `useEffect` and uses a React Hook lint rule workaround. It intentionally returns early on touch devices to avoid broken behavior on mobile.

---

## Known Issues and Notes

- `npm run lint` currently reports several warnings and errors. The errors are concentrated in `src/components/CustomCursor.tsx` because `setState` is called inside `useEffect`. The build still succeeds, but you should resolve these before treating the project as fully clean.
- Some components import `motion` from `framer-motion` without using it (e.g., `FeatureCard.tsx`, `ProjectCard.tsx`).
- `hero-section-5.tsx` imports `cn` from `@/lib/utils` without using it.
- The site uses `img` tags with `eslint-disable-next-line @next/next/no-img-element` in some places instead of Next.js `<Image />`, often for external Unsplash/Pexels URLs or for quick visual iteration. Prefer `<Image />` for local assets where possible.
- `GEMINI.MD` contains the original design brief that inspired the site; it references a generic Framer portfolio template, but the actual site content has been adapted to the Lambda CDMO biotech brand.

---

## Useful Resources

- Next.js docs: <https://nextjs.org/docs>
- Tailwind CSS v4 docs: <https://tailwindcss.com/docs>
- Framer Motion docs: <https://www.framer.com/motion/>
- Project route map: `src/app/[category]/[slug]/page.tsx` and `src/data/cdmoData.ts`
