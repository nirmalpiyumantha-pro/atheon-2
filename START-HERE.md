# Atheon website — start here

This copy matches the live Atheon website's source and assets. The contact form sends the visitor's name, email, selected interest and full message to contact@atheonworks.com. Production sending is configured in Sites, and a live browser submission was confirmed delivered by Resend on 2026-11-01.

Use Node.js 22.13 or newer. Run `npm ci`, then `npm run dev` and open http://localhost:3000.

For production, run `npm run build`, `npm run test:contact`, then `npm start` on a Node host. The build also produces a Worker in `dist/server/index.js`. Uploading only `out/` to a static host will not enable contact submissions.

See [EMAIL-SETUP.md](EMAIL-SETUP.md) for server environment setup on another host. The current sender is website@contact.atheonworks.com; the recipient is contact@atheonworks.com. Secrets are stored only in the hosting environment and are not included in this repository.

Hosted-site source commit: b7513b34e1dac0e13734f882af9cf32d2a754ced
