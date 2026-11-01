# Atheon website

Next.js website with a same-origin contact endpoint. Preserve the existing branding and responsive layouts when editing.

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm run test:contact
npm start
```

For email configuration and deployment, see [EMAIL-SETUP.md](EMAIL-SETUP.md). Sending requires a Resend API key and verified sender domain, configured only on the server. All enquiries go to contact@atheonworks.com. The website cannot send email until those values are configured.

The build exports the existing pages and packages them with the email endpoint as one Worker. The included Node runtime can serve the same build on a server/VPS. A static-only upload of `out/` does not provide the contact endpoint.
