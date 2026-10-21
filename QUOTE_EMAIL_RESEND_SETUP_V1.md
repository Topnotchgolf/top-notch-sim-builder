# Customer quote email service — setup in progress

The current live builder remains V1.60. This Worker is prepared and tested, but is not deployed or connected to the live form yet.

## Accounts
- Worker: top-notch-quote-email
- Endpoint: https://top-notch-quote-email.sales-a23.workers.dev/quote-email
- Verified sending domain: quotes.topnotchgolf.ca
- Fixed sender: Top Notch Golf <quotes@quotes.topnotchgolf.ca>
- Replies: sales@topnotchgolf.ca
- Existing shop quote route remains Formspree https://formspree.io/f/mgaveeol

## Remaining setup
1. Create a Cloudflare Turnstile Managed widget named Top Notch Sim Builder for topnotchgolf.ca.
2. Save its secret key as Worker secret TURNSTILE_SECRET_KEY. RESEND_API_KEY is already saved. Never put either secret into GitHub or Lightspeed.
3. Supply the public Turnstile site key for builder integration.
4. Replace the Hello World Worker code with Top_Notch_Quote_Email_Worker_V1.mjs and deploy.
5. Implement and test the builder integration before changing the live Lightspeed script. Keep the separate V1.55 mobile promo fix.
6. Run a user-authorized test submission to a controlled inbox; verify shop Formspree receipt, Resend delivery status and actual customer inbox content.

## Integration contract
POST application/json to /quote-email from https://topnotchgolf.ca or https://www.topnotchgolf.ca:
- requestId: crypto.randomUUID(), retained for retries of the same submission.
- token: fresh Turnstile token with action quote_email.
- quote: the current builder quote payload (name, email, phone and human-readable product/price fields).

The Worker reconstructs a fixed email template; it does not accept caller HTML, subject, sender or recipient lists. Notes and phone numbers are not included in the customer email. The recipient is the validated quote email address.

Both configured secrets are required. Turnstile success, hostname and action are checked server-side before emailing. Origin checking alone is not authentication. Resend idempotency prevents identical retries within its 24-hour retention window. A fresh challenge is required for each retry.

HTTP 200 with status accepted means Resend accepted the email, not that it reached the inbox. Non-200 responses contain a generic error code and no secrets or customer details. Do not claim successful email delivery on a failure.

The live integration must preserve successful shop submissions if customer emailing fails; offer an email-only retry using the retained payload/requestId and fresh token. Do not repost a successful Formspree request for an email-only retry. Keep required name/email/phone validation, hidden pre-submit totals and existing GA4 event semantics. Do not send contact details to GA4.

## Pricing scope
These are customer-selected retail estimates from the existing builder, not authoritative checkout prices or order confirmations. The service preserves price-on-request items and recurring software pricing and adds the retail discounts/promotions notice. Staff confirm final pricing. This endpoint must never be used to authorize payments or orders.

## Validation
Run: node qa/verify_quote_email_worker_v1.mjs
Tests use mocked network responses only. Coverage: missing secrets, malformed recipients, body limits, origin restrictions, failed or mismatched Turnstile verification, escaped HTML, fixed routing, price-on-request and renewals, duplicate-safe retries and provider/network failures.

## References
- https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/emails/idempotency-keys
