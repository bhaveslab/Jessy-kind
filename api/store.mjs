import { createHash, randomBytes } from 'node:crypto';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const books = {
  'vivir-bien-juntos': { price: 'price_1UYT1q2c1Eq7UIp4IWriAUnv', cents: 1699, env: 'DEVOTIONAL' },
  'entre-dos-idiomas': { price: 'price_1UYTAS2c1Eq7UIp4TXDyPSHS', cents: 999, env: 'WORKBOOK' },
  'diario-navidad': { price: 'price_1UYUEk2c1Eq7UIp4A8QuVMU8', cents: 700, env: 'CHRISTMAS' },
};
const scope = 'jessy-kind';
const windowSeconds = 86400;
const hash = value => createHash('sha256').update(value).digest('hex');

async function stripe(path, params) {
  const response = await fetch('https://api.stripe.com/v1/' + path, {
    method: params ? 'POST' : 'GET',
    headers: { Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY },
    body: params ? new URLSearchParams(params) : undefined,
  });
  if (!response.ok) throw new Error('Stripe request failed');
  return response.json();
}

export default async function store(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('Referrer-Policy', 'no-referrer');
  const mode = process.env.JESSY_CHECKOUT_MODE;
  const live = mode === 'live';
  const secret = process.env.STRIPE_SECRET_KEY || '';
  if (!['test', 'live'].includes(mode) || !secret.startsWith(live ? 'sk_live_' : 'sk_test_')) {
    return res.status(503).send('Las compras aún no están disponibles.');
  }

  try {
    const url = new URL(req.url, 'https://store.invalid');
    const key = url.searchParams.get('book');
    if (!Object.hasOwn(books, key)) return res.status(404).send('Libro no encontrado.');
    const book = books[key];
    const price = live ? book.price : process.env['STRIPE_TEST_PRICE_' + book.env];
    const pdf = URL.parse(process.env['JESSY_PDF_' + book.env] || '');
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!price || !blobToken || !pdf || pdf.protocol !== 'https:' ||
        !pdf.hostname.endsWith('.private.blob.vercel-storage.com')) {
      return res.status(503).send('Este libro aún no está disponible.');
    }

    if (req.method === 'GET' && url.searchParams.has('availability')) {
      return res.status(live || process.env.VERCEL_ENV !== 'production' ? 204 : 503).end();
    }
    if (!live && process.env.VERCEL_ENV === 'production') return res.status(503).end();

    const cookieName = 'jessy_' + book.env;
    const nonce = (req.headers.cookie || '').split(/;\s*/)
      .find(cookie => cookie.startsWith(cookieName + '='))?.split('=')[1] || '';
    if (req.method === 'POST') {
      const origin = new URL(process.env.JESSY_SITE_URL).origin;
      if (req.headers.origin !== origin) return res.status(403).end();
      const proof = /^[a-f0-9]{64}$/.test(nonce) ? nonce : randomBytes(32).toString('hex');
      const testLocation = !live && process.env.JESSY_TEST_CHECKOUT_LOCATION;
      const session = await stripe('checkout/sessions', {
        'adaptive_pricing[enabled]': 'true',
        ...(['PE', 'US'].includes(testLocation)
          ? { customer_email: 'jessy-test+location_' + testLocation + '@example.com' }
          : {}),
        mode: 'payment', locale: 'es', 'payment_method_types[0]': 'card',
        'line_items[0][price]': price, 'line_items[0][quantity]': '1',
        success_url: origin + '/api/store?book=' + key + '&session={CHECKOUT_SESSION_ID}',
        cancel_url: origin + '/#libros',
        'metadata[storefront]': scope, 'metadata[book]': key, 'metadata[proof]': hash(proof),
        'payment_intent_data[metadata][storefront]': scope,
        'payment_intent_data[metadata][book]': key,
      });
      res.setHeader('Set-Cookie', cookieName + '=' + proof +
        '; Path=/api/store; Secure; HttpOnly; SameSite=Lax; Max-Age=172800');
      return res.redirect(303, session.url);
    }

    if (req.method !== 'GET') return res.status(405).end();
    const id = url.searchParams.get('session') || '';
    if (!/^cs_(test|live)_[a-zA-Z0-9]+$/.test(id) || !/^[a-f0-9]{64}$/.test(nonce)) {
      return res.status(403).send('Enlace de descarga inválido.');
    }

    const session = await stripe('checkout/sessions/' + id +
      '?expand[]=line_items&expand[]=payment_intent.latest_charge');
    const charge = session.payment_intent?.latest_charge;
    const items = session.line_items?.data || [];
    if (session.livemode !== live || session.mode !== 'payment' ||
        session.status !== 'complete' || session.payment_status !== 'paid' ||
        session.metadata?.storefront !== scope || session.metadata?.book !== key ||
        session.metadata?.proof !== hash(nonce) || session.currency !== 'usd' ||
        session.amount_total !== book.cents || items.length !== 1 ||
        items[0].quantity !== 1 || items[0].price?.id !== price ||
        !charge?.paid || !charge.captured || charge.refunded || charge.amount_refunded ||
        charge.disputed || !Number.isFinite(charge.created) ||
        Date.now() / 1000 >= charge.created + windowSeconds) {
      return res.status(403).send('La descarga no está disponible para este pago.');
    }

    const file = await fetch(pdf, {
      headers: { Authorization: 'Bearer ' + blobToken },
      redirect: 'error',
    });
    if (!file.ok || !file.body || file.headers.get('content-type')?.split(';')[0] !== 'application/pdf') {
      return res.status(502).send('No pudimos abrir el libro. Inténtalo de nuevo.');
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Disposition', 'attachment; filename="' + key + '.pdf"');
    await pipeline(Readable.fromWeb(file.body), res);
  } catch {
    if (!res.headersSent) res.status(502).send('No pudimos completar la solicitud. Inténtalo de nuevo.');
  }
}
