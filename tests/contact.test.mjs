import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { handleContact } from '../worker/index.mjs';

const env = { RESEND_API_KEY: 're_test_only', FROM_EMAIL: 'Atheon website <contact@atheonworks.com>' };
const valid = () => ({ name: 'Test Customer', email: 'customer@example.com', interest: 'managed', message: 'Please connect our CRM.\nWe need booking and email updates.', submissionId: crypto.randomUUID(), website: '' });
const request = (data = valid(), options = {}) => new Request('https://atheon.example/api/contact', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://atheon.example', ...options.headers }, body: JSON.stringify(data),
});
const ok = async () => Response.json({ id: crypto.randomUUID() });

test('delivers every form field to the fixed mailbox and replies to the visitor', async () => {
  const input = valid();
  let envelope, headers;
  const response = await handleContact(request({ ...input, to: 'attacker@example.com' }), env, async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    envelope = JSON.parse(options.body); headers = options.headers;
    return ok();
  });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  assert.deepEqual(envelope.to, ['contact@atheonworks.com']);
  assert.equal(envelope.from, env.FROM_EMAIL);
  assert.equal(envelope.reply_to, input.email);
  for (const field of [input.name, input.email, input.message, 'Atheon-managed subscription']) assert.ok(envelope.text.includes(field));
  assert.equal(headers['Idempotency-Key'], `atheon-enquiry/${input.submissionId}`);
});

test('all valid interest choices are included in the email', async () => {
  for (const interest of ['general', 'demo', 'managed', 'infrastructure', 'agent', 'knowledge', 'invoices', 'scheduling', 'support']) {
    let body;
    const response = await handleContact(request({ ...valid(), interest }), env, async (_, options) => { body = JSON.parse(options.body); return ok(); });
    assert.equal(response.status, 200);
    assert.ok(body.text.includes('Interested in:'));
    assert.ok(!body.text.includes('undefined'));
    if (interest === 'demo') assert.ok(body.subject.startsWith('Demo request:'));
  }
});

test('missing configuration cannot produce a false success', async () => {
  const response = await handleContact(request(), {}, () => { throw new Error('must not send'); });
  assert.equal(response.status, 503);
  assert.ok(!(await response.json()).success);
});

test('provider failures, malformed success and network errors remain failures', async () => {
  for (const send of [async () => Response.json({ error: 'denied' }, { status: 403 }), async () => Response.json({}), async () => { throw new Error('timeout'); }]) {
    const response = await handleContact(request(), env, send);
    assert.equal(response.status, 502);
    assert.ok(!(await response.json()).success);
  }
});

test('validates every required field and rejects injected headers and unknown interests', async () => {
  for (const fields of [{ name: '' }, { name: 'A\r\nB' }, { email: 'bad' }, { email: 'a@example.com\nBcc:b@example.com' }, { message: '' }, { message: 'x'.repeat(1025) }, { interest: '__proto__' }, { submissionId: 'not-an-id' }, { website: 'bot-filled' }]) {
    const response = await handleContact(request({ ...valid(), ...fields }), env, () => { throw new Error('must not send'); });
    assert.equal(response.status, 400);
  }
});

test('rejects other origins, oversized bodies and non-POST requests', async () => {
  assert.equal((await handleContact(request(valid(), { headers: { Origin: 'https://other.example' } }), env, ok)).status, 403);
  assert.equal((await handleContact(request({ ...valid(), message: 'x'.repeat(17000) }), env, ok)).status, 413);
  assert.equal((await handleContact(new Request('https://atheon.example/api/contact'), env, ok)).status, 405);
});

test('limits repeated requests without sending another message', async () => {
  const limitedEnv = { ...env, CONTACT_CLIENT_IP: crypto.randomUUID() };
  let sent = 0;
  const send = async () => { sent += 1; return ok(); };
  for (let i = 0; i < 5; i++) assert.equal((await handleContact(request(), limitedEnv, send)).status, 200);
  assert.equal((await handleContact(request(), limitedEnv, send)).status, 429);
  assert.equal(sent, 5);
});

test('packaged runtime preserves every exported page and asset byte for byte', async () => {
  const source = await readFile('dist/server/index.js', 'utf8');
  const { default: worker } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  let checked = 0;
  async function walk(dir, prefix = '') {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = `${prefix}/${entry.name}`;
      if (entry.isDirectory()) await walk(`${dir}/${entry.name}`, path);
      else {
        const response = await worker.fetch(new Request(`https://atheon.example${path}`));
        assert.equal(response.status, 200, path);
        assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(`${dir}/${entry.name}`), path);
        checked += 1;
      }
    }
  }
  await walk('out');
  assert.ok(checked > 50);
  assert.equal((await worker.fetch(new Request('https://atheon.example/'))).status, 200);
  assert.equal((await worker.fetch(new Request('https://atheon.example/privacy'))).status, 308);
  assert.equal((await worker.fetch(new Request('https://atheon.example/missing-page/'))).status, 404);
  assert.equal((await worker.fetch(request())).status, 503);
});
