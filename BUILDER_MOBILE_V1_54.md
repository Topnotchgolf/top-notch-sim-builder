# Simulator builder V1.54 — mobile enclosure improvements

Release: `2026-10-20-consolidated-v1.54`.

## Customer experience

At widths of 900 CSS pixels or less, the 3D preview starts closed. A View 3D Preview button becomes available after entering valid dimensions and leaving the Room step. Customers can open and close it, including on Review. Opening the preview allows normal vertical scrolling over the canvas. Interact with 3D enables rotation; Done rotating restores scrolling. Moving to another builder section closes the preview. Desktop keeps the existing expanded preview.

On mobile, enclosure type, size, and configuration appear as progressive disclosure panels. Completed choices collapse to a summary with a Change control. The next choice opens and is brought into view. Single-configuration enclosures still advance directly to launch monitors. Screen-only choices use the same progressive layout. Returning to the enclosure section allows customers to change earlier choices.

The release targets the small fixed-position tab with the exact wording “Get Exclusive Insights” while the builder is visible on mobile. It restores the tab outside the builder. It does not target unrelated widgets or larger forms/modals. This is a defensive text-and-layout match because the promo was present in the customer recording but absent from the authoring browser. An iframe-based tab or a differently structured widget may require a specific integration after inspecting it on the live mobile page.

Catalog entries, prices, fit calculations, software compatibility, quote processing, and session-only build state are retained.

## New analytics

Existing GA4 events and the existing Simulator Builder Journey funnel remain compatible. The new events use the current Lightspeed-managed Google tag and consent behavior. No second tag is installed.

| Event | Meaning | Additional parameters |
|---|---|---|
| `sim_front_choice` | Customer selects an enclosure/screen family, size, or enclosure configuration | `front_mode`, `front_stage`, `product_id` |
| `sim_front_no_fit` | A selected family has no sizes that fit valid room dimensions | `front_mode`, `front_stage=size`, `product_id` (family) |

`front_mode` is `enclosure` or `screen`. `front_stage` is `family`, `size`, or `configuration`. For a single-configuration enclosure, size selection also records its automatically selected configuration. Screen-only products have family and size events only. Repeat changes are recorded; event count therefore measures actions, not unique people. No-fit events are deduplicated within the page for the same family and room dimensions. Raw dimensions and contact values are not included in these new event payloads.

All events retain `builder_version`, `step_name`, and `step_number`. Define event-scoped custom dimensions for `front_mode` (Front mode) and `front_stage` (Front choice stage). Reuse or add `product_id` (Product ID) and `builder_version` (Builder version) if needed.

For an enclosure-specific funnel, use indirectly followed steps:

1. `sim_step_view` with `step_name = Enclosure + Screen`.
2. `sim_front_choice` with `front_mode = enclosure` and `front_stage = family`.
3. `sim_front_choice` with `front_mode = enclosure` and `front_stage = size`.
4. `sim_front_choice` with `front_mode = enclosure` and `front_stage = configuration`.
5. `sim_step_view` with `step_name = Launch Monitor`.

Break down by Device category and filter to the V1.54 builder version for the new flow. Track screen-only journeys separately because they do not have configuration events. A missing next funnel event is not by itself proof that someone exited: they may switch modes, navigate elsewhere in the builder, or be untracked. Compare user counts over a longer period; the original sample was small and may include testing.

## Validation and rollout

Authoring checks passed for JavaScript syntax, balanced mobile markup, unchanged catalog/pricing source, preview/touch-state logic, enclosure and screen click flows, automatic advancement, selected prices, no-fit deduplication, and scoped promo targeting. Existing mocked checks also passed for GA4 routing, step/form funnels, quote validation and submission errors/success, contact-data exclusion, active timing, blocked analytics, and unsaved builds. No live quote was submitted by the tests.

These are automated logic/markup checks, not an iPhone Safari rendering test. After replacing the Lightspeed script with the versioned V1.54 URL, use an iPhone 15 in Safari to check:

- Room inputs appear without the preview taking up space.
- Type → size → configuration progresses smoothly; Change reopens completed choices.
- 3D opens only on request; normal swipes scroll until Interact with 3D is tapped.
- The red promo tab is hidden while the builder is visible and returns elsewhere.
- Choosing a final enclosure advances to launch monitors.
- New choice events appear in GA4 Realtime without replacing the existing funnel events.

Publishing this file in GitHub does not change the Lightspeed page until its script tag is replaced. Rollback is the previous V1.53 script URL.
