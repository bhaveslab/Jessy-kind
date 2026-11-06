const products = {
  'vivir-bien-juntos': { name: 'Aprendamos los Secretos de Vivir Bien Juntos', price: 1699, cover: '/assets/main.webp' },
  'entre-dos-idiomas': { name: 'Between Two Languages / Entre Dos Idiomas', price: 999, cover: '/assets/lang.webp' },
  'diario-navidad': { name: 'Diario de La Noche Antes de Navidad', price: 700, cover: '/assets/xmas.webp' },
};
const storageKey = 'jessy-kind-cart-v1';
const $ = id => document.getElementById(id);
let cart = {};
let ready = false;
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  for (const [key, qty] of Object.entries(saved)) {
    if (Object.hasOwn(products, key) && Number.isInteger(qty) && qty >= 1 && qty <= 10) cart[key] = qty;
  }
} catch {}
const usd = cents => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
const count = () => Object.values(cart).reduce((sum, qty) => sum + qty, 0);
function save() { try { localStorage.setItem(storageKey, JSON.stringify(cart)); } catch {} }
function render() {
  $('cart-count').textContent = count();
  const container = $('cart-items');
  container.replaceChildren();
  for (const [key, qty] of Object.entries(cart)) {
    const product = products[key];
    const row = document.createElement('div');
    row.className = 'cart-row';
    const img = document.createElement('img'); img.src = product.cover; img.alt = '';
    const detail = document.createElement('div');
    const title = document.createElement('strong'); title.textContent = product.name;
    const qtyControls = document.createElement('div'); qtyControls.className = 'cart-qty';
    const less = document.createElement('button'); less.type = 'button'; less.textContent = '−'; less.setAttribute('aria-label', 'Quitar uno de ' + product.name);
    less.addEventListener('click', () => change(key, -1));
    const number = document.createElement('span'); number.textContent = String(qty);
    const more = document.createElement('button'); more.type = 'button'; more.textContent = '+'; more.disabled = qty >= 10; more.setAttribute('aria-label', 'Añadir uno de ' + product.name);
    more.addEventListener('click', () => change(key, 1));
    qtyControls.append(less, number, more); detail.append(title, qtyControls);
    const price = document.createElement('span'); price.textContent = usd(product.price * qty);
    row.append(img, detail, price); container.append(row);
  }
  if (!count()) { const empty = document.createElement('p'); empty.className = 'muted'; empty.textContent = 'Tu carrito está vacío.'; container.append(empty); }
  $('cart-total').textContent = usd(Object.entries(cart).reduce((sum, [key, qty]) => sum + products[key].price * qty, 0));
  $('cart-checkout').disabled = !ready || !count();
  $('cart-status').textContent = ready ? 'Pago seguro mediante Stripe. Descarga digital después del pago.' : 'Las compras se habilitarán después de las pruebas de pago.';
  $('cart-payload').value = JSON.stringify(Object.entries(cart).map(([book, quantity]) => ({ book, quantity })));
}
function change(key, delta) {
  const next = Math.max(0, Math.min(10, (cart[key] || 0) + delta));
  if (next) cart[key] = next; else delete cart[key];
  save(); render();
}
function openCart() {
  $('cart-panel').hidden = false; $('cart-backdrop').hidden = false;
  document.body.style.overflow = 'hidden'; $('cart-close').focus();
}
function closeCart() {
  $('cart-panel').hidden = true; $('cart-backdrop').hidden = true;
  document.body.style.overflow = ''; $('cart-toggle').focus();
}
$('cart-toggle').addEventListener('click', openCart);
$('cart-close').addEventListener('click', closeCart);
$('cart-backdrop').addEventListener('click', closeCart);
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('cart-panel').hidden) closeCart(); });
for (const button of document.querySelectorAll('.add-to-cart')) {
  button.addEventListener('click', () => { change(button.dataset.book, 1); openCart(); });
}
$('cart-form').addEventListener('submit', event => {
  if (!ready || !count()) { event.preventDefault(); return; }
  try { sessionStorage.setItem('jessy-kind-last-order', JSON.stringify(Object.keys(cart))); } catch {}
  $('cart-payload').value = JSON.stringify(Object.entries(cart).map(([book, quantity]) => ({ book, quantity })));
});
render();
fetch('/api/store?availability=1', { cache: 'no-store' })
  .then(response => { ready = response.status === 204; render(); })
  .catch(() => { ready = false; render(); });
