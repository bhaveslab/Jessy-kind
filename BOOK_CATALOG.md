# Jessy Kind — Storefront integration contract

Repository: bhaveslab/Jessy-kind. Vercel team: Bhaves Lab. Intended Vercel project: jessy-kind-peru. Frontend: static index.html.

## Approved catalog

| Book | USD | Stripe Product | Stripe Price | Key |
|---|---:|---|---|---|
| Aprendamos los Secretos de Vivir Bien Juntos | $16.99 | prod_VZcGa5AoIXs7MH | price_1UYT1q2c1Eq7UIp4IWriAUnv | vivir-bien-juntos |
| Between Two Languages / Entre Dos Idiomas | $9.99 | prod_VZcP3POMVyX58X | price_1UYTAS2c1Eq7UIp4TXDyPSHS | entre-dos-idiomas |
| Diario de La Noche Antes de Navidad | $7.00 | PENDING | PENDING | diario-navidad |

Merchant: existing Bhave Stripe live account. Prices are USD one-time payments; not subscriptions. Do not use a different account or create duplicate products. The third Stripe product could not be created due to a tool safety block and must be verified before use.

## Fulfillment

These books are paid PDF downloads. Never put the full PDFs in a publicly reachable /public path or expose direct asset URLs from the public site. Use verified successful payment plus private storage and short-lived download access, or an equivalent secure fulfillment system. The product cards and dollar amounts may be displayed before checkout is enabled; do not enable payment until delivery is tested.

Sales proceeds are collected by the merchant, with Jessy's earnings reconciled separately after agreed costs. Settlement schedule/terms remain to be recorded. Do not invent royalty percentages or deductions.

## Assets

Preserve the approved images as assets/jessy.webp, assets/main.webp, assets/lang.webp, assets/xmas.webp. These binaries were supplied in the ChatGPT Peru project but are not yet in this repository. Do not substitute unrelated pictures. Website HTML and README are already committed.

## Operations

Inspect actual repository and team/project before writes. Do not modify bhaveslab/bhaves-lab or bhaveslab/bhaves-app. The Vercel project jessy-kind-peru has not been verified by the connected account, and no deployment URL exists yet.