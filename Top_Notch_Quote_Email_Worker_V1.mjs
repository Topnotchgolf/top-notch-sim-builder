// Cloudflare Worker module. Secrets: RESEND_API_KEY and TURNSTILE_SECRET_KEY.
// This endpoint emails customers only; the builder retains its Formspree shop submission.
const ORIGINS = new Set(['https://topnotchgolf.ca', 'https://www.topnotchgolf.ca']);
const HOSTS = new Set(['topnotchgolf.ca', 'www.topnotchgolf.ca']);
const FIELDS = [
  'Room Dimensions', 'Golfer Setup', 'Enclosure / Screen', 'Enclosure / Screen Price',
  'Screen Ratio', 'Launch Monitor Placement', 'Launch Monitor', 'Launch Monitor Price',
  'Software Add-ons', 'Software Total (one-time purchases plus first year)', 'Annual Software Renewal',
  'Projector Placement', 'Projector', 'Projector Price', 'Hitting Surface', 'Hitting Surface Price',
  'HotShot Non Slip Mat Base', 'Putting Turf', 'Rough Turf', 'Flooring Base', 'Computer', 'Monitor',
  'Acoustic Tiles', 'Protection Pads', 'Projector Mount', 'SimRail', 'Estimated Product Total', 'Pricing Note'
];
const REQUIRED = ['Room Dimensions', 'Golfer Setup', 'Enclosure / Screen', 'Enclosure / Screen Price',
  'Launch Monitor', 'Launch Monitor Price', 'Projector', 'Projector Price',
  'Hitting Surface', 'Hitting Surface Price', 'Estimated Product Total', 'Pricing Note'];
const RETAIL = 'This quote is done in full retail pricing. We will reach out with best available pricing including discounts and promotions.';
const LIMIT = 24000;
const escapeHtml = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('body');
  const chunks = []; let size = 0;
  while (true) {
    const {done, value} = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > LIMIT) { await reader.cancel(); throw new Error('size'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

function cleanString(value, max) {
  if (typeof value !== 'string' || value.length > max || /[\u0000-\u001f\u007f]/.test(value)) throw new Error('field');
  return value.trim();
}

function quoteData(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('quote');
  const name = cleanString(raw.name, 120), email = cleanString(raw.email, 254).toLowerCase();
  const phone = cleanString(raw.phone, 50);
  if (!name || !/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(email) || phone.replace(/\D/g, '').length < 7) throw new Error('contact');
  const fields = {};
  for (const key of FIELDS) {
    if (raw[key] !== undefined) fields[key] = cleanString(raw[key], key === 'Software Add-ons' ? 2400 : 1600);
  }
  for (const key of REQUIRED) if (!fields[key]) throw new Error('required');
  return {name, email, fields};
}

function emailContent(quote) {
  const rows = Object.entries(quote.fields).filter(([, value]) => value && value !== 'None' && value !== 'No software add-ons selected');
  const text = [
    'TOP NOTCH GOLF — YOUR SIMULATOR QUOTE', '', `Hi ${quote.name},`, '',
    'Thank you for building your simulator with Top Notch Golf. Here is a copy of your selected products and estimated pricing in Canadian dollars.', '',
    ...rows.map(([key, value]) => `${key}: ${value}`), '', RETAIL, '',
    'This is an estimate, not an order confirmation. Our team will confirm product availability and final pricing.',
    'Questions? Reply to this email or contact sales@topnotchgolf.ca.', '', 'Top Notch Golf'
  ].join('\n');
  const html = `<!doctype html><html><body style="margin:0;background:#f3f5f4;font-family:Arial,sans-serif;color:#17251e"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#fff"><tr><td style="padding:28px;background:#142b21;color:white;font-size:24px;font-weight:bold">Top Notch Golf</td></tr><tr><td style="padding:28px;font-size:17px;line-height:1.6"><h1 style="font-size:26px;margin:0 0 20px">Your simulator quote</h1><p>Hi ${escapeHtml(quote.name)},</p><p>Thank you for building your simulator with Top Notch Golf. Here is a copy of your selected products and estimated pricing in Canadian dollars.</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.map(([key, value]) => `<tr><td style="padding:12px 0;border-bottom:1px solid #dfe6e1;overflow-wrap:anywhere"><strong>${escapeHtml(key)}</strong><br>${escapeHtml(value)}</td></tr>`).join('')}</table><p><strong>${RETAIL}</strong></p><p>This is an estimate, not an order confirmation. Our team will confirm product availability and final pricing.</p><p>Questions? Reply to this email or contact <a href="mailto:sales@topnotchgolf.ca">sales@topnotchgolf.ca</a>.</p><p>Top Notch Golf</p></td></tr></table></td></tr></table></body></html>`;
  return {text, html};
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowed = ORIGINS.has(origin);
    const headers = {'Content-Type':'application/json', 'Cache-Control':'no-store', 'Vary':'Origin'};
    if (allowed) headers['Access-Control-Allow-Origin'] = origin;
    const respond = (status, body) => new Response(JSON.stringify(body), {status, headers});
    if (new URL(request.url).pathname !== '/quote-email') return respond(404, {error:'not_found'});
    if (!allowed) return respond(403, {error:'origin_not_allowed'});
    if (request.method === 'OPTIONS') return new Response(null, {status:204, headers:{...headers, 'Access-Control-Allow-Methods':'POST', 'Access-Control-Allow-Headers':'Content-Type', 'Access-Control-Max-Age':'600'}});
    if (request.method !== 'POST') return respond(405, {error:'method_not_allowed'});
    if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY) return respond(503, {error:'email_not_configured'});
    if (!/^application\/json(?:;|$)/i.test(request.headers.get('Content-Type') || '')) return respond(415, {error:'json_required'});
    let body, quote;
    try {
      body = await readBody(request);
      if (!body || typeof body !== 'object' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(body.requestId)) throw new Error('id');
      if (typeof body.token !== 'string' || !body.token || body.token.length > 2048) throw new Error('token');
      quote = quoteData(body.quote);
    } catch { return respond(400, {error:'invalid_request'}); }
    // Origin filtering is not authentication: always validate a fresh Turnstile token.
    try {
      const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method:'POST', headers:{'Content-Type':'application/json'}, signal:AbortSignal.timeout(10000),
        body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY, response:body.token, remoteip:request.headers.get('CF-Connecting-IP') || undefined})
      });
      if (!verification.ok) return respond(503, {error:'verification_unavailable'});
      const result = await verification.json();
      if (!result.success || !HOSTS.has(result.hostname) || result.action !== 'quote_email') return respond(403, {error:'verification_failed'});
    } catch { return respond(503, {error:'verification_unavailable'}); }
    const message = {
      from:'Top Notch Golf <quotes@quotes.topnotchgolf.ca>', to:[quote.email],
      reply_to:'sales@topnotchgolf.ca', subject:'Your Top Notch Golf simulator quote', ...emailContent(quote)
    };
    try {
      const content = JSON.stringify(message);
      const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(content));
      const hash = [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
      const response = await fetch('https://api.resend.com/emails', {
        method:'POST', signal:AbortSignal.timeout(15000),
        headers:{'Authorization':`Bearer ${env.RESEND_API_KEY}`, 'Content-Type':'application/json', 'Idempotency-Key':`tnsb-${body.requestId}-${hash}`},
        body:content
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.id) return respond(502, {error:'email_not_accepted'});
      // Accepted by Resend does not guarantee delivery to the recipient's inbox.
      return respond(200, {status:'accepted'});
    } catch { return respond(502, {error:'email_status_unknown'}); }
  }
};
