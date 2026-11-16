# Luma Learning

A complete responsive landing page for the Buzzvel Front-End Engineer November 2026 coding challenge, implemented from the supplied desktop (1280px) and mobile (402px) Figma frames.

## Run locally

Use **Node.js 24 LTS** (an `.nvmrc` is included) and npm.

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

```sh
npm run lint       # ESLint, including accessibility and Next.js rules
npm run typecheck  # TypeScript
npm run build      # Production build
npm start          # Serve the production build
```

No environment variables, API keys, database, or external services are needed. Fonts are fetched at build time by `next/font` and then served locally.

## Implementation

- Next.js App Router, React, strict TypeScript, and Tailwind CSS 4. Static page sections are Server Components; navigation, dialogs, and forms are small client components.
- All required sections are present: header, hero, categories, featured course, how it works, testimonial and statistics, community, contact form, final CTA, and footer.
- The original Figma photographs, avatars, community collage, contact icons, and decorative illustrations are stored in `public/images`. `next/image` supplies responsive images; the hero is preloaded and secondary photographs load lazily. Inter and Plus Jakarta Sans are self-hosted with `next/font`.
- CSS Grid and Flexbox adapt the composition to tablet and mobile. Mobile puts the hero image first, stacks cards and CTAs, lays out statistics horizontally, and uses a disclosure navigation menu.
- Typed mock content lives in `lib/content.ts`. Category actions open a filterable course catalog; course details include lessons and a local learning list. Join, login, community, and informational footer actions have usable demo dialogs.
- Native `<dialog>` provides modal focus containment and Escape handling; closing restores focus to the initiating control. The page includes landmarks, a skip link, meaningful image alternatives, visible focus indicators, associated form labels, inline errors, and reduced-motion support.

## Decisions and limitations

- Only one page is specified. Links navigate to its relevant sections; additional experiences use dialogs rather than inventing extra routes.
- No backend is required. Contact validation and confirmation are local; **no email is sent**. Profiles and course enrollment are in-memory demonstrations and reset on reload. Course videos and real authentication are outside the scope of this test.
- The mobile contact form uses the Portuguese labels and placeholders shown in its Figma frame; desktop uses English. Error text follows the same breakpoint. This mirrors the supplied design rather than adding a language selector.
- The desktop step labels repeat “01” in Figma. The implementation numbers them “01”, “02”, and “03”, matching mobile. The community paragraph retains the supplied placeholder copy.
- The private Figma integration could not access the source file. Design properties and original assets were inspected/exported through the browser instead. Small font-rasterization and export-shadow differences may remain across browsers.
- The site is marked `noindex` because it is a recruitment demo.

## Validation and AI use

OpenAI Codex assisted with reading the brief, inspecting the Figma design, implementing the components, and checking the result. Validation included ESLint, strict TypeScript, a production build, npm audit, and browser checks of desktop/mobile layouts, navigation, category filtering, course details, local enrollment, keyboard dismissal, and contact validation/success states. The browser's ColorZilla extension injected a body attribute and produced a development hydration warning; checks were repeated in an incognito window without that extension.

Approximate time spent: **about one hour**, including implementation and verification. Review and understand the demo behavior before submitting or discussing the code.
