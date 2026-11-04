# Atheon website: start here

This repository matches the configured Atheon-3 preview source and assets, including its Tailwind hero, GSAP scroll animations and TypeScript contact flow.

The contact form sends the visitor’s name, email, selected interest, full message and submission time to contact@atheonworks.com. The visitor’s email is used as Reply-To. A green confirmation appears after the email provider accepts the enquiry.

Use Node.js 22.13 or newer. Run `npm ci`, then `npm run dev` and open http://localhost:3000.

For production, run `npm run build`, `npm run test:contact`, then `npm start` on a Node host. The build also produces a Worker in `dist/server/index.js`. Uploading only `out/` to a static host will not enable contact submissions.

Configure `RESEND_API_KEY`, `FROM_EMAIL` and `PUBLIC_BASE_URL` in your own host’s server environment. The preview’s private environment values are not copied to GitHub. See [EMAIL-SETUP.md](EMAIL-SETUP.md) and `.env.example` for configuration.

Source preview: https://atheon-3-preview.nirmalpiyumantha.chatgpt.site

Synced preview source commit: c9e546b3d0b1b4ab8bcf592e0892956a2e8692e4
