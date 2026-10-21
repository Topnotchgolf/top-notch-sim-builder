# V1.61 customer quote email installation

Prepared October 21, 2026. Not yet confirmed deployed in Cloudflare or installed in Lightspeed.

## Confirmed setup
- Resend domain quotes.topnotchgolf.ca verified.
- User confirmed both Worker secrets saved: RESEND_API_KEY and TURNSTILE_SECRET_KEY.
- Public Turnstile site key: 0x4AAAAAAFfJ0oyubY09t0nG.
- Worker: top-notch-quote-email.sales-a23.workers.dev.
- Both automated suites passed using mocked network requests. No real emails sent.

## Install in this order
1. In Cloudflare, open Worker top-notch-quote-email → Edit code. Replace all Hello World code with Top_Notch_Quote_Email_Worker_V1.mjs from this repository. Deploy. Secret values remain in Worker Settings; do not paste secrets into code.
2. In Lightspeed, replace the main V1.60 builder script with:

```html
<script src="https://cdn.jsdelivr.net/gh/Topnotchgolf/top-notch-sim-builder@9df21ea6998059c181d5551aac69968403006ce1/Top_Notch_Sim_Builder_CONSOLIDATED_V1_61.js"></script>
```

Leave the existing separate V1.55 mobile promo fix script in place.

3. Open the builder in a new tab and submit a test using an email inbox you control. Check the shop's Formspree receipt, customer inbox/spam folder and Resend delivery status. Check selected products, prices, subtotal, annual software and the retail-pricing notice.

The Worker root path currently returns 404 by design. Its endpoint is POST /quote-email; visiting the homepage does not test sending.

## Behavior
- Existing Formspree submission to the shop happens first.
- A successful shop submission reveals the estimate, as before.
- Customer email includes selected product and price fields, totals, recurring software and the retail discounts/promotions notice.
- Successful email API acceptance says the email is on its way, not guaranteed inbox delivery.
- Email failures retain the successful shop quote and revealed estimate. Retry Email Copy resends only the customer email with a fresh verification token and retained idempotency identity.
- Delayed verification automatically sends the pending email once completed.
- Edits made during submission do not reveal a stale total for the changed build.
- Contact data, tokens and secrets are not sent to GA4. Existing quote success tracks shop acceptance. New events sim_quote_email_accepted and sim_quote_email_error track the email API outcome.
- Draft and submitted snapshots exist only in page memory, preserving fresh starts after tab close.

## Tests
```sh
node qa/verify_quote_email_worker_v1.mjs
node qa/verify_quote_email_builder_v161.mjs
```

These exercise the actual builder payload through the Worker with mocked provider requests, required fields, review price hiding, software renewals, accessories, shop failure, email partial failure/retry, repeated submissions, delayed verification, in-flight edits and analytics privacy.

## Rollback
Restore the previous main V1.60 script (keep V1.55 mobile patch):
```html
<script src="https://cdn.jsdelivr.net/gh/Topnotchgolf/top-notch-sim-builder@791e51331084bc934bad7ed80756c4bcf9adf7f6/Top_Notch_Sim_Builder_CONSOLIDATED_V1_60.js"></script>
```

## Limitations
Pricing is an estimate from the browser's existing builder logic, not a server-authoritative order price. Staff confirm final prices. Turnstile protects the email endpoint; it is not proof that Formspree accepted a corresponding shop request. Provider idempotency lasts 24 hours, and an unconfirmed Formspree network failure retains Formspree's existing duplicate-submission risk. Live inbox delivery still requires the controlled test above.
