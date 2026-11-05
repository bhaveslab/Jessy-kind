# Jessy Kind — Website

Spanish-first static website for Jessy Kind, maintained as a standalone site within Bhavé's Lab infrastructure.

## Current state

- Website source: `index.html` on `main`.
- No build required. Vercel framework preset: **Other**, root directory `./`, output directory blank.
- GitHub: `bhaveslab/Jessy-kind`.
- Intended Vercel team: **Bhaves Lab**.
- Intended Vercel project: `jessy-kind-peru`.
- No payments, reservations, or commerce endpoints are enabled.
- Do not modify `bhaveslab/bhaves-lab` or `bhaveslab/bhaves-app`.

## Codex task — complete the website

1. Inspect this repository and Vercel project before editing.
2. Import image assets from the prepared **Jessy_Kind_Website_Starter.zip** attached to the ChatGPT Peru project conversation. Unpack its four files under `assets/`:
   - `assets/jessy.webp` — Jessy portrait
   - `assets/main.webp` — main Spanish devotional cover
   - `assets/lang.webp` — bilingual workbook cover
   - `assets/xmas.webp` — Spanish Christmas journal cover
3. Match `index.html` references to these files. Do not substitute stock images for Jessy's portrait or approved covers.
4. Verify mobile/desktop rendering, all three cover images, navigation, and Spanish text. Make accessibility corrections as appropriate.
5. Deploy the repository's `main` branch in Vercel team **Bhaves Lab** under project **jessy-kind-peru**. Do not introduce a paid integration, new database, or separate architecture.
6. Check the live deployment status and give its exact verified URL.

## Notes

Books are existing separate PDF artifacts. Do not place the full PDFs into this public site until the intended download or checkout behavior is chosen. The cards currently describe the books without purchase links. Keep tutoring booking inactive.

## Prepared website asset package

`Jessy_Kind_Website_Starter.zip` is in the ChatGPT Peru project conversation. It contains the initial HTML and the four webp images. Use the images from the ZIP but preserve the latest committed `index.html` layout unless a correction is necessary.

## Final launch steps — domain and inquiries

- Jessy's business inquiry email is **jessycruzb12@gmail.com**. The website has a `mailto:` contact link. Do not create a separate inbox or assume access to her Gmail.
- Connecting a custom domain is the **last step**, after website images, verified Stripe checkout, secure PDF fulfillment, and production deployment have passed QA.
- Domain name is **not selected**. Never buy a domain, modify DNS, or transfer ownership without a concrete approved domain and required access.
- Preserve the standalone Vercel project `jessy-kind-peru` in the **Bhaves Lab** team. Do not change other projects.

## Bookstore deployment

Set `JESSY_CHECKOUT_MODE=test` in Preview and use the Stripe test secret as
`STRIPE_SECRET_KEY`. Set `STRIPE_TEST_PRICE_DEVOTIONAL`,
`STRIPE_TEST_PRICE_WORKBOOK`, and `STRIPE_TEST_PRICE_CHRISTMAS` to the
matching one-time USD test prices. Set `JESSY_SITE_URL` to the deployment
origin. Upload the final PDFs to a private Vercel Blob store and set
`JESSY_PDF_DEVOTIONAL`, `JESSY_PDF_WORKBOOK`, and `JESSY_PDF_CHRISTMAS`
to their private Blob URLs. Use that store's `BLOB_READ_WRITE_TOKEN`.

The Checkout return downloads the purchased PDF in the same browser for
24 hours after payment. Retrying the URL rechecks the same payment and does
not create another fulfillment record. A refund or dispute blocks subsequent
downloads. This flow uses card Checkout and does not send a download email.

Checkout enables Stripe Adaptive Pricing per session and keeps USD as the
integration currency. Stripe shows the final amount and available payment
currencies before payment. The site's PEN equivalents are estimates.
For hosted Preview tests set `JESSY_TEST_CHECKOUT_LOCATION=PE`, complete a
PEN test-card purchase, then set it to `US`, redeploy Preview, and complete
a separate USD purchase. Verify the final charge currency before submitting,
and verify the resulting PDF, repeat access, expiry, and refund behavior.
The location override is only used in test mode.

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
