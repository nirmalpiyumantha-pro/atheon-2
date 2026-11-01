# Atheon website — start here

This copy matches the latest published Atheon site, including the integrations ribbon,
updated plans, compact hero confirmation, consistent page alignment and subtle animations.
The agent feature copy is concise; process, approval and support details sit in the existing agent, plans and FAQ sections.
Hosted-site source commit: 31c0141fb06c85060bfb109fc7b02e2cb5e55127

## Open and run on Windows / VS Code

1. Clone this repository, or download and extract its ZIP from GitHub.
2. Open the repository folder in VS Code.
3. Install Node.js if needed. This Next.js version requires Node.js >=20.9.0.
   npm is included with Node.js.
4. In VS Code, choose Terminal > New Terminal, then run:

```powershell
npm ci
npm run dev
```

Open http://localhost:3000 . Save a file to see your edits in the browser.
Stop the server with Ctrl+C.

## Files you will probably edit

- `app/(home)/page.tsx` — section order.
- `components/home/hero-section/index.tsx` — hero headline and buttons.
- `components/home/hero-section/booking-scene.tsx` — chat content.
- `components/home/hero-section/booking-scene.module.css` — chat styling.
- `components/home/our-capabilities-section/` — capability layout and scroll behavior.
- `components/home/custom-agents.tsx` — AI agent features.
- `components/home/plans.tsx` — plans and deployment content.
- `components/home/integrations-ribbon.tsx` — travelling application ribbon.
- `public/integration-logos/` — local application logos.
- `components/home/scroll-motion.tsx` — one-time scroll reveals.
- `components/home/performance-figures/index.tsx` — count-up animation.
- `lib/performance-figures-data.ts` — statistics and labels.
- `lib/faqs-data.ts` — FAQs.
- `lib/nav-items-data.ts` — navigation.
- `app/globals.css` — shared styling, brand colors and animation rules.
- `assets/images/` and `public/` — images, fonts and other assets.
- `app/privacy/page.tsx` and `app/terms/page.tsx` — policy pages.
- `components/footer.tsx` — footer.

## Production build

```powershell
npm run build
```

The project uses Next.js static export. The deployable website is generated in `out/`.
Use a static web host for that folder. `npm start` / `next start` is not the
production serving method for this static-export configuration.
If Python is installed, you can preview the built output with:

```powershell
python -m http.server 3000 --directory out
```

The current contact form prepares an email draft in the visitor's email app;
it does not submit to a backend form database. No secret is needed for that flow.
Before deploying on your own domain, update the origin/canonical URLs in
`app/layout.tsx`, `app/robots.ts` and `app/sitemap.ts` as appropriate.

Website source and assets are included. Dependency folders, generated
build output, Git history, and the ChatGPT hosting binding are excluded.
Run `npm ci` to restore dependencies; no changes to the live website are made by
cloning or editing this copy.
