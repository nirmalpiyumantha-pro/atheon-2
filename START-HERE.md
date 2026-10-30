# Atheon website — start here

This is the latest published source, including the updated hero, green Booked label,
section order, policy pages and animated statistics.
Source commit: a7d6a87ec7aa8f445e80f058dec97619fc2a2495

## Open and run on Windows / VS Code

1. Extract this ZIP.
2. Open the extracted `atheon-website` folder in VS Code.
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
- `components/home/performance-figures/index.tsx` — count-up animation.
- `lib/performance-figures-data.ts` — statistics and labels.
- `lib/faqs-data.ts` — FAQs.
- `lib/nav-items-data.ts` — navigation.
- `app/globals.css` — shared styling and brand colors.
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

All tracked website source and assets are included. Dependency folders, generated
build output, Git history, and the ChatGPT hosting binding are excluded.
Run `npm ci` to restore dependencies; no changes to the live website are made by
extracting or editing this copy.
