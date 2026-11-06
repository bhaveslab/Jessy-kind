# JESSY KIND — PRODUCTION OPERATING PLAN
Version: November 6, 2026. Planning horizon: November 2026–November 2027.
Status: Website and digital bookstore passed positive Preview tests November 6, 2026; production checkout not activated. Review PR #1 remains unmerged. No production sale is claimed.

## Operating model
Jessy Kind is the public personality, voice, educator and on-camera presence.
Bhavé directs the overall production, commercial strategy, creative packaging, technology and campaign execution.
Axiom Aligned Media LLC may support back-office administration, not public-facing branding. Stripe's connected live U.S. account currently identifies a business_type=individual and business profile name Bhavé. Do not assume Jessy Kind or Axiom Aligned Media LLC is the account's registered merchant of record, or change account ownership or identity without explicit approval.
Jessy's consent and approval are required for use of her identity, recorded voice, likeness, testimony and personal faith messages. Commercial rights, content ownership, compensation and account permissions must be separately documented. Do not infer that anyone owns Jessy's personal name or social accounts.

## Brand
Spanish-first. Warm, polished pastel palette: blush pink, cream, muted lavender, subtle gold. Retain approved photography and book art.
Public expressions: books, devotionals, YouTube, TikTok, Instagram, podcast interviews, teaching, KIND clothing and gifts.
Jessy records original devotions. ElevenLabs may support transcription or audio enhancement; OpenArt may provide original cinematic visuals with clear synthetic-media disclosures when appropriate. No unauthorized voice clone, fabricated real testimonials or impersonation.

## Launch gates (strictly sequential)
A1. Review draft PR #1 multi-book cart and server fulfillment authorization.
A2. Validate cart UX on mobile/desktop and keyboard accessibility; test quantities, multiple distinct titles, invalid cart and cancelled checkout.
A3. Upload the three approved PDFs to the existing private Vercel Blob store, never public assets.
A4. Configure isolated Stripe test-mode keys, test Price IDs, JESSY_SITE_URL and private Blob URLs in Preview without exposing secrets in Git.
A5. Test in hosted Preview: one-book and multi-book checkout, wrong-book download rejection, declined payment, repeat downloads, expired link, refund/dispute and Peru PEN display (with USD fallback); reconcile totals and charges. **Do not claim a test passed until it did.**
A6. Confirm accurate payment merchant information, customer support/refund policies, digital delivery, currency presentation and tax responsibilities.
A7. After checks pass, deploy live Stripe keys only to Production and explicitly enable JESSY_CHECKOUT_MODE=live. Verify a production purchase and fulfillment. Live sales remain disabled before this gate.

## Next production chapters
B (channel foundation): Confirm creator permissions, reserve Jessy Kind handles where available, set up brand profiles and templates; record pilot devotional and produce reviewed short clips.
C (launch): 30-day Spanish-first book campaign, campaign landing links, short video variants, organic publishing, measured conversion tracking and targeted podcast interview outreach. No paid ad budget without explicit authorization.
D (merchandise): approve designs and samples, select fulfilment and shipping partner, configure variants, shipping, returns and taxes before accepting physical orders. KIND merchandise is coming soon until this is done.
E (quarterly growth): review sales and production; expand what performs; improve educational material and media output, update direction monthly.
Year-end (November 2027): assess brand direction, audience, commercial outcomes, Jessy's workload, rights and future investment; no assumed operations handoff.

## Weekly production cadence (proposal)
Monday: Jessy records original devotion; production prepares weekly scripts.
Tuesday: edit narration and visuals; publish teaching short.
Wednesday: devotion short and community engagement.
Thursday: product feature and interview outreach.
Friday: full devotional or guest appearance.
Saturday: batch production, edit, QA and schedule.
Sunday: reflection and next week's content review.
Targets adjust to Jessy's actual recording availability. Scripts, clips and guest invitations must be approved before publishing where they represent her own views.

## Production status — verified November 6, 2026
- Brand photos and existing public site: user approved. Domain jessykind.com attached to the existing Vercel project jessy-kind-peru.
- USD prices: devotional $16.99, bilingual workbook $9.99, Christmas journal $9.99, verified under the existing US Stripe merchant account.
- Final PDFs: all three uploaded to existing private Blob store jessy-kind-private-books and object count verified 3. Preview download paths configured; anonymous Blob access denied.
- Draft PR #1 implements multi-book checkout and secure PDF delivery; GitHub Vercel checks pass and last reviewed Preview is READY. PR is not merged and production lacks payment environment variables.
- Preview Stripe: test-mode secret configured and three test prices present. Stripe shows paid test orders totaling $19.98 (two titles) and $36.97 (three titles); user confirmed all three downloads. User confirmed the successful-order cart reset works.
- Download validation: 12/12 simulated authorization tests pass, including wrong book, unpaid, refunded, partial refund, dispute, tampered amounts and expired access. A real $19.98 Stripe test refund succeeded; the underlying charge reports refunded. Hosted denial-after-refund has not yet been observed.
- Checkout hardening after tests: per-order proof cookie prevents later purchases invalidating older receipts, and simulated consecutive-order tests pass. The site no longer shows obsolete soles estimates. Support/refund-request contact and 24-hour same-browser download terms are disclosed.
- Still open: hosted negative/refund/expiry access verification; real eligible Peru-presentment/PEN behavior; merchant-facing legal identity and finalized refund policy; seller tax review where applicable. Production remains OFF; live setup requires separate authorization and secrets entered directly into Vercel.
- YouTube/TikTok/Instagram publishing and podcast interviews: not confirmed established or scheduled.

## Operating discipline
Follow one production line at a time. Keep public website free of unverified launch claims. Make reversible design/code changes in a review branch. Confirm before real spending, new legal registrations, account ownership changes or launch. Report completed vs untested vs blocked separately.
