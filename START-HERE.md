# Atheon website — start here

This branch preserves the current website and prepares direct contact-form email delivery to contact@atheonworks.com. It is not enabled on the live site yet: server-side Resend configuration and a real delivery check are required.

Use Node.js 22.13 or newer. Run `npm ci`, then `npm run dev` and open http://localhost:3000.

For production, run `npm run build`, `npm run test:contact`, then `npm start` on a Node host. The build also produces a Worker in `dist/server/index.js`. Uploading only `out/` to a static host will not enable contact submissions.

See [EMAIL-SETUP.md](EMAIL-SETUP.md) for the required Resend key and verified sender. Keep secrets out of GitHub.

Prepared hosted-site source commit: b7513b34e1dac0e13734f882af9cf32d2a754ced
