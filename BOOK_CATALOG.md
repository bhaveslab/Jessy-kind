# Jessy Kind — Storefront integration contract

Repository: bhaveslab/Jessy-kind. Vercel team: Bhaves Lab. Intended Vercel project: jessy-kind-peru. Frontend: static index.html.

## Approved catalog

| Book | USD | Stripe Product | Stripe Price | Key |
|---|---:|---|---|---|
| Aprendamos los Secretos de Vivir Bien Juntos | $16.99 | prod_VZcGa5AoIXs7MH | price_1UYT1q2c1Eq7UIp4IWriAUnv | vivir-bien-juntos |
| Between Two Languages / Entre Dos Idiomas | $9.99 | prod_VZcP3POMVyX58X | price_1UYTAS2c1Eq7UIp4TXDyPSHS | entre-dos-idiomas |
| Diario de La Noche Antes de Navidad | $9.99 | prod_VZdVqAMarG8OTC | price_1UYnfg2c1Eq7UIp4DozRsQFC | diario-navidad |

Merchant: existing Bhave Stripe live account. Prices are USD one-time payments; not subscriptions. Do not use a different account or create duplicate products. The third Stripe product was created in the existing Bhave live account on November 5, 2026. All three Stripe products and prices exist. No checkout or paid fulfillment is activated.

## Fulfillment

These books are paid PDF downloads. Never put the full PDFs in a publicly reachable /public path or expose direct asset URLs from the public site. Use verified successful payment plus private storage and short-lived download access, or an equivalent secure fulfillment system. The product cards and dollar amounts may be displayed before checkout is enabled; do not enable payment until delivery is tested.

Sales proceeds are collected by the merchant, with Jessy's earnings reconciled separately after agreed costs. Settlement schedule/terms remain to be recorded. Do not invent royalty percentages or deductions.

## Assets

Preserve the approved images as assets/jessy.webp, assets/main.webp, assets/lang.webp, assets/xmas.webp. These binaries were supplied in the ChatGPT Peru project but are not yet in this repository. Do not substitute unrelated pictures. Website HTML and README are already committed.

## Operations

Inspect actual repository and team/project before writes. Do not modify bhaveslab/bhaves-lab or bhaveslab/bhaves-app. The Vercel project jessy-kind-peru has not been verified by the connected account, and no deployment URL exists yet.
## USD and Peruvian sol checkout requirement (Nov 5, 2026)

Jessy’s storefront must support buyers paying in either **USD** or **PEN** when the Bhave Stripe merchant account and the buyer’s payment method support that currency. Keep the approved USD prices $16.99 / $9.99 / $9.99. Christmas journal was increased from $7.00 on November 6, 2026 with a new Stripe price under the same existing product. The homepage now shows *indicative* PEN equivalents S/ 58.64 / S/ 34.48 / S/ 34.48 based on a dated reference FX rate of 1 USD ≈ 3.4519 PEN (Nov 5, 2026); these are **not yet actual PEN Stripe prices**. Do not represent the displayed estimates as locked charge amounts.

Codex: inspect Stripe Checkout's supported multi-currency options in the existing Bhave account (Adaptive Pricing vs explicit PEN currency prices). Implement a clear buyer-facing currency choice or Stripe-supported localization that permits USD and PEN, with the **actual charge currency and final amount shown before payment**. Verify a Peru checkout in PEN and USD fallback in hosted test conditions; confirm unsupported payment-method limitations. Do not fabricate a PEN payment or activate live sales before fulfillment tests. If using fixed PEN prices, establish an approved pricing policy and create linked PEN prices without changing the original USD price IDs. Record actual paid currency, gross amount, Stripe FX/processing fees, refunds, and settlement net.
