import { createHash, randomBytes } from 'node:crypto';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const catalog = {
  'vivir-bien-juntos': { price: 'price_1UYT1q2c1Eq7UIp4IWriAUnv', cents: 1699, env: 'DEVOTIONAL' },
  'entre-dos-idiomas': { price: 'price_1UYTAS2c1Eq7UIp4TXDyPSHS', cents: 999, env: 'WORKBOOK' },
  'diario-navidad': { price: 'price_1UYUEk2c1Eq7UIp4A8QuVMU8', cents: 700, env: 'CHRISTMAS' },
};
const hash = value => createHash('sha256').update(value).digest('hex');
const scope = 'jessy-kind';
const lifetime = 86400;
const secureCookie = 'jessy_order_proof';

async function stripe(path, params) {
  const response = await fetch('https://api.stripe.com/v1/' + path, {
    method: params ? 'POST' : 'GET',
    headers: { Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY },
    body: params ? new URLSearchParams(params) : undefined,
  });
  if (!response.ok) throw new Error('Stripe operation failed');
  return response.json();
}

function productConfiguration(key, live) {
  const book = catalog[key];
  if (!book) return null;
  const price = live ? book.price : process.env['STRIPE_TEST_PRICE_' + book.env];
  const blob = process.env['JESSY_PDF_' + book.env] || '';
  const pdf = URL.parse(blob);
  if (!price || !process.env.BLOB_READ_WRITE_TOKEN || !pdf ||
      pdf.protocol !== 'https:' || !pdf.hostname.endsWith('.private.blob.vercel-storage.com')) return null;
  return { ...book, price, pdf };
}

function parseCart(input) {
  const raw = typeof input === 'string' ? JSON.parse(input) : input;
  if (!Array.isArray(raw) || !raw.length || raw.length > 3) return null;
  const seen = new Set();
  const items = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object' || !Object.hasOwn(catalog, item.book) ||
        seen.has(item.book) || !Number.isInteger(item.quantity) ||
        item.quantity < 1 || item.quantity > 10) return null;
    seen.add(item.book);
    items.push({ book: item.book, quantity: item.quantity });
  }
  return items.sort((a, b) => a.book.localeCompare(b.book));
}

export default async function store(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('Referrer-Policy', 'no-referrer');
  const mode = process.env.JESSY_CHECKOUT_MODE;
  const live = mode === 'live';
  const secret = process.env.STRIPE_SECRET_KEY || '';
  if (!['test', 'live'].includes(mode) || !secret.startsWith(live ? 'sk_live_' : 'sk_test_') ||
      (!live && process.env.VERCEL_ENV === 'production')) {
    return res.status(503).send('Las compras aún no están disponibles.');
  }

  try {
    const url = new URL(req.url, 'https://store.invalid');
    const key = url.searchParams.get('book');
    const cookie = (req.headers.cookie || '').split(/;\s*/)
      .find(value => value.startsWith(secureCookie + '='))?.split('=')[1] || '';
    if (req.method === 'GET' && url.searchParams.has('availability')) {
      const ready = Object.keys(catalog).every(k => productConfiguration(k, live));
      return res.status(ready ? 204 : 503).end();
    }
    if (req.method === 'POST') {
      const origin = new URL(process.env.JESSY_SITE_URL).origin;
      if (req.headers.origin !== origin) return res.status(403).end();
      let cart;
      try { cart = parseCart(req.body?.cart); } catch { return res.status(400).send('Carrito inválido.'); }
      if (!cart) return res.status(400).send('Carrito inválido.');
      const items = cart.map(({ book, quantity }) => ({ book, quantity, config: productConfiguration(book, live) }));
      if (items.some(item => !item.config)) return res.status(503).send('Uno de los libros no está disponible.');
      const proof = randomBytes(32).toString('hex');
      const params = {
        'adaptive_pricing[enabled]': 'true',
        mode: 'payment', locale: 'es', 'payment_method_types[0]': 'card',
        success_url: origin + '/shop-success.html?session={CHECKOUT_SESSION_ID}',
        cancel_url: origin + '/#libros',
        'metadata[storefront]': scope,
        'metadata[cart]': JSON.stringify(cart),
        'metadata[proof]': hash(proof),
        'payment_intent_data[metadata][storefront]': scope,
      };
      for (const [index, item] of items.entries()) {
        params['line_items[' + index + '][price]'] = item.config.price;
        params['line_items[' + index + '][quantity]'] = String(item.quantity);
      }
      const session = await stripe('checkout/sessions', params);
      if (!session.url) throw new Error('Missing checkout URL');
      res.setHeader('Set-Cookie', secureCookie + '=' + proof +
        '; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=172800');
      return res.redirect(303, session.url);
    }
    if (req.method !== 'GET') return res.status(405).end();
    if (!Object.hasOwn(catalog, key)) return res.status(404).send('Libro no encontrado.');
    const config = productConfiguration(key, live);
    if (!config) return res.status(503).send('Este libro aún no está disponible.');
    const id = url.searchParams.get('session') || '';
    if (!/^cs_(test|live)_[a-zA-Z0-9]+$/.test(id) || !/^[a-f0-9]{64}$/.test(cookie)) {
      return res.status(403).send('Enlace de descarga inválido.');
    }
    const session = await stripe('checkout/sessions/' + id +
      '?expand[]=line_items&expand[]=payment_intent.latest_charge');
    const charge = session.payment_intent?.latest_charge;
    const purchased = session.line_items?.data || [];
    let cart;
    try { cart = parseCart(session.metadata?.cart); } catch { cart = null; }
    const matching = cart?.find(item => item.book === key);
    const validLines = cart && purchased.length === cart.length &&
      cart.every(item => {
        const cfg = productConfiguration(item.book, live);
        return cfg && purchased.some(line =>
          line.price?.id === cfg.price && line.quantity === item.quantity);
      });
    const expectedTotal = cart?.reduce((sum, item) => sum + catalog[item.book].cents * item.quantity, 0);
    if (session.livemode !== live || session.mode !== 'payment' ||
        session.status !== 'complete' || session.payment_status !== 'paid' ||
        session.metadata?.storefront !== scope || session.metadata?.proof !== hash(cookie) ||
        !matching || !validLines || session.currency !== 'usd' || session.amount_total !== expectedTotal ||
        !charge?.paid || !charge.captured || charge.refunded || charge.amount_refunded ||
        charge.disputed || !Number.isFinite(charge.created) ||
        Date.now() / 1000 >= charge.created + lifetime) {
      return res.status(403).send('La descarga no está disponible para este pago.');
    }
    const file = await fetch(config.pdf, {
      headers: { Authorization: 'Bearer ' + process.env.BLOB_READ_WRITE_TOKEN },
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
