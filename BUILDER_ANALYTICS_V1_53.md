# Top Notch Sim Builder — GA4 setup and reports

Destination: **G-RB366KL941**. Stream ID: **16142723522**.

## Activate and verify

1. Save the Measurement ID in Lightspeed E-Series under Settings → General → Tracking & Analytics → Google Analytics ID. The Google tag must load on the actual builder page. The builder update sends events through the existing tag; it does not install another tag or change consent settings.
2. Replace the builder's script tag with the V1.53 release supplied in chat and refresh the page.
3. Open Google Analytics → Reports → Realtime. In another tab, visit the builder, scroll it into view, enter dimensions, select an enclosure, and continue through the build. If the site asks for analytics consent, make the appropriate choice for the test.
4. Look for `sim_builder_loaded`, `sim_builder_view`, `sim_builder_start`, `sim_step_view`, and `sim_product_select` in the event list. Viewing the form and typing into it adds `sim_quote_form_view` and `sim_quote_start`.
5. A successful real quote submission adds `sim_quote_success`; submitting a test quote also sends it to the shop. Authoring tests used mocks and sent no real quote or analytics traffic.

If events are absent, check that the tag is installed on the builder page, that the latest builder script is loaded, and that consent or a blocker is not preventing collection. Do not install a second copy of the tag as a first troubleshooting step. Analytics receipt in this account has not yet been verified from the authoring environment.

## Reports to configure in GA4

Under Admin → Custom definitions, create these **event-scoped custom dimensions**, using the event parameter names exactly:

| Display name | Event parameter |
|---|---|
| Builder section | `step_name` |
| Builder version | `builder_version` |
| Product category | `product_category` |
| Product ID | `product_id` |
| Selection action | `selection_action` |
| Validation field | `error_field` |
| Submission error type | `error_type` |
| Quote already submitted | `quote_submitted` |

Create one event-scoped **custom metric**: Active builder seconds, parameter `active_seconds`, unit Seconds. Custom definitions can take 24–48 hours to become available in reporting. Standard dimensions such as device category and traffic source can be used alongside these.

### Main funnel

In Explore, create a Funnel exploration. Use indirectly followed steps so other events can occur between them:

| Funnel stage | Event / condition |
|---|---|
| Started a build | `sim_builder_start` |
| Completed room | `sim_step_complete` and `step_name = Room` |
| Completed enclosure | `sim_step_complete` and `step_name = Enclosure + Screen` |
| Completed launch-monitor step | `sim_step_complete` and `step_name = Launch Monitor` |
| Completed electronics | `sim_step_complete` and `step_name = Electronics` |
| Reached review | `sim_step_view` and `step_name = Review` |
| Saw quote form | `sim_quote_form_view` |
| Started form | `sim_quote_start` |
| Successful quote | `sim_quote_success` |

Break down by Device category to compare mobile and desktop. A second free-form table using `sim_step_view` by Builder section shows sections reached even when someone skips steps via navigation. Another table using `sim_step_complete` shows completed choices. Mark `sim_quote_success` as a key event; do not mark quote clicks as successful conversions.

GA4 funnels count users according to their reporting identity, not necessarily distinct builds. The builder deduplicates first-view, start, first section reach, and first success within each page visit. A reload starts a new build but may remain in the same GA4 session. Event counts therefore describe build activity; do not label all event counts as unique people.

### Useful diagnostic tables

- `sim_product_select` by Product category and Product ID, filtered to `selection_action = select`: product interest. These are selection actions, including switches, not purchases or unique visitors.
- `sim_quote_validation` by Validation field: which requirements block submission. One attempt can have several missing fields.
- `sim_quote_error` by Submission error type: server versus network failures. `http_status` is also attached for debugging.
- `sim_step_time` by Builder section with Active builder seconds: aggregate foreground time. Divide by first section reaches only for an approximate per-visit average, including time from revisits.
- `sim_builder_leave` by Builder section, filtered to `quote_submitted = 0`: best-effort page departure signals for visits without a successful quote.

## Event meanings and limits

| Event | Meaning |
|---|---|
| `sim_builder_loaded` | Builder initialized successfully once on this page. Compare with site page views when investigating loading problems. |
| `sim_builder_view` | Builder first enters the visible page area. |
| `sim_builder_start` | First dimension input, changed product selection, or quote-form engagement. Navigation alone is not a build start. |
| `sim_step_view` | First time each active section is reached while the builder is in view. It is not proof that every product in that section was read. |
| `sim_step_complete` | Forward navigation from a section with its core choices complete. Accessories may be intentionally left empty. |
| `sim_product_select` | A known catalog selection changes, including optional accessories/software and removals. |
| `sim_quote_form_view` | Contact form becomes visible on Review. |
| `sim_quote_start` | First nonempty contact-form input; no input values are included. |
| `sim_quote_attempt` | A quote submission is attempted, including attempts blocked by validation. |
| `sim_quote_validation` | One unmet requirement, identified only by field/category code. |
| `sim_quote_error` | The form service rejects the request or the request fails. |
| `sim_quote_success` | First accepted quote request during this build visit. This confirms service acceptance, not delivery to an inbox. |
| `sim_quote_resubmitted` | Another accepted quote request from the same page visit. |
| `sim_step_time` | Incremental active seconds; hidden/offscreen time is excluded, and inactivity is capped after 60 seconds. |
| `sim_builder_pause` | The tab becomes hidden. Switching tabs is not necessarily abandonment. |
| `sim_builder_leave` | A best-effort page departure signal; not all browser exits can be recorded. |

Use the funnel's last observed progress to estimate abandonment. Do not add pause and leave events together as a count of lost customers. An automatically advanced section may be the last section reached even if the visitor never chose anything in it.

The custom events exclude names, emails, phone numbers, notes, search text, raw server errors, and complete build snapshots. The builder does not save selections between visits. GA4's own identity, consent, and retention settings remain separate. Tracking can be blocked; historic unrecorded activity cannot be recovered.

The code has passed mocked event, navigation, quote, privacy, and timing checks. A live GA4 receipt check and account-side report setup remain required.

Official references:
- https://developers.google.com/analytics/devguides/collection/ga4/events
- https://developers.google.com/tag-platform/gtagjs/routing
- https://support.google.com/analytics/answer/14240153
- https://support.google.com/analytics/answer/9355964
