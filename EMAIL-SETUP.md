# Contact email setup

The form posts to `/api/contact` on the website's own server. Every accepted enquiry is sent to **contact@atheonworks.com**, including the visitor's name, email, selected interest, full message and submission time. Replies go to the visitor's email address.

## Required production configuration

1. Verify a sending domain you control in Resend. For the current deployment, the verified sending domain is `contact.atheonworks.com`; use that subdomain and add the DNS records shown in the Resend dashboard.
2. Create a Resend API key with permission to send from that domain.
3. Configure these **server-side** environment variables in your hosting provider:

```dotenv
RESEND_API_KEY=your-sending-key
FROM_EMAIL=Atheon website <website@contact.atheonworks.com>
PUBLIC_BASE_URL=https://your-website-domain.example
```

Use the real public website origin for `PUBLIC_BASE_URL` when running the Node server behind an HTTPS reverse proxy. The hosted Worker uses the request origin directly.

Keep the key secret. Do not put it in GitHub, client code, a `NEXT_PUBLIC_` variable, or a hosting manifest. `.env.example` contains names only. Local development loads `.env.local` (ignored by Git).

## Run and deploy

Use Node.js 22.13 or newer:

```bash
npm ci
npm run dev
```

Production on a Node host:

```bash
npm run build
npm start
```

`npm start` serves the website and email endpoint together. Set `PORT` and `HOST` if required by the host. The build also creates a self-contained Cloudflare Worker in `dist/server/index.js`, used by Sites hosting.

**Uploading only `out/` to a static host will not run the contact endpoint.** The exported pages must be served by the included runtime, or the `/api/contact` handler must be deployed separately with the same-origin route configured.

## Verify before enabling

```bash
npm run build
npm run test:contact
```

The tests mock the email provider: they verify routing, all fields, validation, duplicate-request keys and failure handling, without sending real email. After adding production credentials, submit one identifiable test enquiry from the live website and confirm it arrives in the mailbox. A successful API response means Resend accepted the message; inbox placement still depends on delivery and mailbox filtering.

The form does not store enquiries in a database. It keeps entered text after a failure, reports success only after provider acceptance, and has a honeypot, body limits and best-effort per-instance rate limiting. Production abuse protection can be expanded if needed.
