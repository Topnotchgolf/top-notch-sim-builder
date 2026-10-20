# V1.56 quote page and customer email preparation

## Ready website changes
- Main review heading, form heading, navigation label and preceding button: Get your Quote.
- Preserve Ready to see your estimated total? and existing explanatory text.
- Prompt size increases from 13px to 16px; supporting text from 11px to 14px with increased line height.
- Add: Please check your spam or junk folder for emails about your quote.
- Review product cards still hide prices before submission. Existing successful submission reveals the total.
- GA4 retains the internal section name Review, so existing funnels do not require renaming.
- Existing V1.54 mobile UX remains; keep the separate V1.55 Mailchimp promo fix script.
- No product prices, fit rules, endpoint, lead validation or quote delivery destinations changed.

## Email status: account configuration required
This release does NOT activate automatic customer emails by itself. It adds the plain-text quote_breakdown field to the existing Formspree submission at form mgaveeol. The email field continues to identify the customer's address.

quote_breakdown includes the selected products and prices, sizes/configurations, accessory quantities, software billing frequency, estimated total, items awaiting a price, and the existing retail pricing and tax/shipping/installation disclaimers. It omits unselected extras. It is generated from the same payload and pricing functions used by the shop's quote notification.

CUSTOMER_QUOTE_EMAIL_V1_56.html is a prepared Formspree customer autoresponse template. It uses escaped Mustache variables, not raw HTML interpolation. Do not enable it until the account supports submission fields and its preview/test resolves both name and quote_breakdown.

Required account checks:
1. Confirm the form's project and current Formspree plan.
2. Confirm that a custom sending domain is verified and selected for the project. Do not guess DNS values.
3. Create/select the autoresponse template in that project.
4. On the form's Workflow tab, configure Auto Response with from name Top Notch Golf, subject Your Top Notch Golf simulator quote, recipient from email, and the prepared template.
5. Test using an authorized shop-controlled email address; confirm both the shop notification and the customer's full itemized email arrive. Confirm annual software and price-on-request items render correctly.
6. Only then describe automatic customer email delivery as active. A successful form POST is not evidence of email delivery.

The public Formspree docs say autoresponses are on Professional/Business, custom templates and sending domains are on Business, and inclusion of submission data in autoresponses needs a custom domain. Their generic template page also contains a warning about restricted submission variables. Verify the custom-domain capability in the actual account and a real test before activation. No subscription upgrade, DNS change, Formspree setting change, or test email was performed during authoring.

Sources:
- https://help.formspree.io/articles/plugins/sending-a-confirmation-or-response-email
- https://help.formspree.io/articles/advanced-features/setting-email-domain
- https://help.formspree.io/articles/advanced-features/setting-custom-email-templates

## Validation
PASS: full source parses and initializes; navigation display updated while GA4 Review stays stable; review prices remain hidden; exactly one mocked Formspree request; unchanged catalog; same total in customer breakdown; yearly software, accessory quantities and unpriced items included; existing success response preserved. No live emails sent. Safari and Formspree autoresponse delivery not tested.
