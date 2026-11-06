# Jessy Kind — Website

Spanish-first static website for Jessy Kind, maintained as a standalone site within Bhavé's Lab infrastructure.

## Current state

- Website source: `index.html` on `main`.
- No build required. Vercel framework preset: **Other**, root directory `./`, output directory blank.
- GitHub: `bhaveslab/Jessy-kind`.
- Intended Vercel team: **Bhaves Lab**.
- Intended Vercel project: `jessy-kind-peru`.
- Production commerce remains disabled. The Stripe-hosted multi-book storefront is implemented and paid test-mode checkout/download tests have passed in Preview.
- Do not modify `bhaveslab/bhaves-lab` or `bhaveslab/bhaves-app`.

## Current website and books — verified November 6, 2026

- Public domain `jessykind.com` is attached to the existing Vercel project `jessy-kind-peru`. Domain configuration exists; the newest book cart changes remain on the GitHub review branch `feature/multi-book-cart` (Draft PR #1), not production.
- Three final editions are in existing private Vercel Blob store `jessy-kind-private-books`, object count **3**. Authenticated PDF checksums matched and anonymous Blob requests returned 403 according to the upload verification. Never publish direct Blob links.
- Hosted Preview checkout: user completed paid Stripe **TEST** orders for 2 books ($19.98) and 3 books ($36.97) and confirmed each purchased PDF downloaded. An additional $9.99 test session completed. No live purchase was made.
- Cart reset after successful checkout was fixed; user confirmed it works in the browser. Manual `Vaciar carrito` button remains available.
- Test refund: full $19.98 refund succeeded in Stripe test mode; charge now reports `refunded=true` and `amount_refunded=1998`. Twelve mocked server-authorization cases passed, including denied access for refunded/unpaid/expired/wrong-title requests. This does **not** constitute a hosted refund/expiry denial test.
- The success flow now gives each order an independent proof cookie (commit `b3ba71d`), with mocked consecutive-purchase tests passing. Existing test receipts retain a legacy cookie fallback.
- Prices are **USD $16.99 / $9.99 / $9.99**. The site no longer displays fixed PEN exchange-rate estimates. Stripe Adaptive Pricing is requested at checkout; PEN buyer presentation still requires verification in an eligible context.
- The business/Stripe account is in the **United States**. Stripe currently identifies an individual merchant profile named **Bhavé** (not a Jessy Kind legal entity); confirm customer-visible seller identity before switching on live sales.
- Support email is `inquiry@axiomaligned.com`. Checkout discloses that digital downloads are available for 24 hours in the same browser, with a support/refund-request route.
- Latest reviewed Preview is READY. Do not describe production checkout as live.

## Launch boundary

The website and bookstore are **Preview-tested**, not live-commerce-launched. Production has no payment environment variables configured. Before a live launch, confirm merchant/customer-facing identity and refund terms, review relevant US and cross-border digital-sale tax obligations, complete hosted refund/negative download and buyer-currency checks, configure the existing production secrets privately, merge the reviewed PR, and run a complete production purchase/download test. Enabling live payments or changing merchant ownership requires explicit owner approval. The user may also choose to leave checkout disabled and end website work.

## Bookstore deployment

Set `JESSY_CHECKOUT_MODE=test` in Preview and use the Stripe test secret as
`STRIPE_SECRET_KEY`. Set `STRIPE_TEST_PRICE_DEVOTIONAL`,
`STRIPE_TEST_PRICE_WORKBOOK`, and `STRIPE_TEST_PRICE_CHRISTMAS` to the
matching one-time USD test prices. Set `JESSY_SITE_URL` to the deployment
origin. Upload the final PDFs to a private Vercel Blob store and set
`JESSY_PDF_DEVOTIONAL`, `JESSY_PDF_WORKBOOK`, and `JESSY_PDF_CHRISTMAS`
to their private Blob URLs. Use that store's `BLOB_READ_WRITE_TOKEN`.

The Checkout return downloads each purchased PDF in the same browser for
24 hours after payment. Each order has its own proof cookie, so a second purchase
does not invalidate the first receipt. Retrying a URL rechecks payment authorization. A refund or dispute blocks subsequent
downloads. This flow uses Stripe-hosted Checkout with dashboard-selected payment methods and does not send a download email.

Checkout enables Stripe Adaptive Pricing per session and keeps USD as the
integration currency. Stripe shows the final amount and available payment
currencies before payment. There is no fixed PEN price on the site. Stripe must show any localized charge amount before confirmation. No `JESSY_TEST_CHECKOUT_LOCATION` override is implemented: do not claim a location-forced test. Verify eligible Peru local-currency behavior separately if required.

For settlement, export charges marked `storefront=jessy-kind` and key rows
by Stripe charge ID. Join the successful PaymentIntent or Checkout event by
PaymentIntent ID. Record the book and buyer-paid currency and amount from
`presentment_details` when present, otherwise from the paid USD transaction.
Keep integration and settlement currency and amounts in separate columns.
Use the charge and refund balance transactions for settlement gross, signed
refund adjustments, actual fees (including any FX fees), and settlement net.
Reconcile later refunds against the original charge and subtract only
agreed expenses, in the settlement currency. Keep test and live rows separate.

Leave production checkout disabled until hosted test purchases, declines,
refunds, download retries and settlement reconciliation pass. Production
requires explicit `JESSY_CHECKOUT_MODE=live` and the Bhave live secret.

## Private book storage — configured November 5, 2026

- Vercel project: `prj_v1WgOTnmCyMBrNHfpUt2G8Rs20D3` (`jessy-kind-peru`).
- Private Vercel Blob store: `jessy-kind-private-books` (`store_whfBKVsTLs4sZ1FG`), region `iad1`, access **private**.
- Vercel generated encrypted `BLOB_READ_WRITE_TOKEN` and it is scoped to **Preview only**. Do not copy this token into code or logs.
- The existing private Blob store contains three uploaded final PDFs, with verified authenticated download checksums and denied anonymous access. All three `JESSY_PDF_*` Preview variables are configured. Do not expose public PDF URLs.
- The connected Stripe account exposes both test and live modes. Three matching test prices and the sensitive `STRIPE_SECRET_KEY` are configured for Preview, never GitHub.
- Preview checkout works and paid TEST downloads passed. Live checkout remains disabled until the remaining hosted security/currency tests, merchant/refund disclosures, production secret configuration, and explicit launch approval.


## Jessy Kind business contact (November 2026)
Public inquiries, order support, and customer service: inquiry@axiomaligned.com, managed by Axiom Aligned. Jessy remains the public-facing teacher/creator. Do not publish her personal email or alter personal channel login/ownership based on this contact update.
