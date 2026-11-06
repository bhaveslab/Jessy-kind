# Jessy Kind — Storefront integration contract

Repository: bhaveslab/Jessy-kind. Vercel team: Bhaves Lab. Intended Vercel project: jessy-kind-peru. Frontend: static index.html.

## Approved catalog

| Book | USD | Stripe Product | Stripe Price | Key |
|---|---:|---|---|---|
| Aprendamos los Secretos de Vivir Bien Juntos | $16.99 | prod_VZcGa5AoIXs7MH | price_1UYT1q2c1Eq7UIp4IWriAUnv | vivir-bien-juntos |
| Between Two Languages / Entre Dos Idiomas | $9.99 | prod_VZcP3POMVyX58X | price_1UYTAS2c1Eq7UIp4TXDyPSHS | entre-dos-idiomas |
| Diario de La Noche Antes de Navidad | $9.99 | prod_VZdVqAMarG8OTC | price_1UYnfg2c1Eq7UIp4DozRsQFC | diario-navidad |

Merchant: existing Bhave Stripe live account. Prices are USD one-time payments; not subscriptions. Do not use a different account or create duplicate products. The third Stripe product was created in the existing Bhave live account on November 5, 2026. All three Stripe products and prices exist. Paid checkout is active **only in Preview test mode**; two- and three-book test orders were completed and delivered. Real-money Production checkout remains disabled.

## Fulfillment

These books are paid PDF downloads. Never put the full PDFs in a publicly reachable /public path or expose direct asset URLs from the public site. Use verified successful payment plus private storage and short-lived download access, or an equivalent secure fulfillment system. The product cards and dollar amounts may be displayed before checkout is enabled; do not enable payment until delivery is tested.

Sales proceeds are collected by the merchant, with Jessy's earnings reconciled separately after agreed costs. Settlement schedule/terms remain to be recorded. Do not invent royalty percentages or deductions.

## Assets

Preserve the approved images as assets/jessy.webp, assets/main.webp, assets/lang.webp, assets/xmas.webp. Preserve the approved existing artwork and photographs. Do not substitute unrelated pictures or change the published visual identity. Website HTML and README are already committed.

## Operations

Inspect actual repository and team/project before writes. Do not modify bhaveslab/bhaves-lab or bhaveslab/bhaves-app. The connected Vercel project jessy-kind-peru, preview branch deployment, and private Blob store have been verified. Main production branch does not yet include this storefront change.
## USD and Peruvian sol checkout requirement (Nov 5, 2026)

Jessy's book prices remain **$16.99 / $9.99 / $9.99 USD**. The website shows USD prices and defers any supported localization to Stripe-hosted Checkout's Adaptive Pricing. The formerly displayed fixed soles estimates have been removed; they were dated approximations, not live guaranteed PEN amounts. The buyer sees the actual payable amount and currency in Stripe before confirming.

Eligibility for PEN presentment depends on Stripe and buyer location/payment method; **a Peru-based PEN test has not been verified**. Do not promise PEN checkout, present stale exchange rates as current, or create linked PEN prices without an approved policy. The merchant account is US-based (Stripe business profile Bhavé). Seller-of-record disclosures, tax obligations and refund policy must be confirmed before real-money launch.

For accounting, record actual paid currency and amount (use Stripe `presentment_details` when present), Stripe settlement net, refunds and processing fees from the transaction records. Keep TEST orders separate from live orders. Production payments remain disabled until merchant-approved release.
