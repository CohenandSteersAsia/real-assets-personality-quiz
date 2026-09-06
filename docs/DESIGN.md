# Design direction

## Surface and composition

An editorial **Decide / Learn** experience, not a financial dashboard. The landing page pairs a large Georgia headline and bold sans-serif REAL emphasis with four slightly rotated collectible illustration cards. The next section is a simple two-column editorial statement, not a feature grid. The quiz prioritises the question, four legible options, progress and navigation.

The result is a self-contained screenshot card, approximately 900px wide on desktop: approved logo on white, a dark-blue personality and artwork area, then a concise description, traits and asset label on white. Mobile stacks these areas with a compact 185px illustration. Height remains content-driven so longer copy and text zoom cannot be cropped. Retake and compliance copy belong outside the card.

## Identity and tokens

- Dark blue `#003087`: headlines, primary controls, result panel, selected states.
- Bright blue `#059bd6`: illustration accents, progress and the thin result divider; not small text on white.
- Corporate grey `#b2b2b2`: illustration materials and secondary geometry; not body text.
- White `#ffffff`: primary canvas and the approved logo's background.
- Ink `#152c4b`: body text.
- Muted `#556477`: explanatory and compliance text.
- Surface `#f3f5f7`, selection tint `#edf5fb`, border `#d6dce3`.
- Georgia / Times New Roman for editorial display; Arial / Helvetica for neutral, legible interface text. No external fonts.

Use the supplied `public/brand/cohen_steers_logo-40_2.svg` unchanged: proportional sizing, white background, no recolouring, filters, clipping or invented lockups. The favicon is a neutral R quiz marker, not a fabricated corporate logo.

## Original illustration set

These are original neutral editorial illustrations, not corporate assets or investment/product representations. Every SVG has a 500 × 500 viewBox, a white circular field, accessible title, and only the approved blue/white/grey palette. Preserve the complete composition with `object-fit: contain`.

- **The Place-Maker / real estate:** functioning homes, workplaces, a shopfront and people in a shared neighbourhood. No construction-only or evergreen-leaf shorthand.
- **The Backbone / infrastructure:** a suspension bridge joining transport, energy and connected network nodes.
- **The Adapter / commodities:** metal coil, mineral facets and stacked material forms with responsive exchange arcs.
- **The Resourceful / natural resources:** productive field rows, grain and a farm building, connecting resources to output.

The same illustrations appear on the landing and result cards. Personality distinction comes from subject and geometry, not four unrelated colour themes.

## Interaction and accessibility

Use at least 44px touch targets, a 3px visible keyboard focus outline and actual radio semantics. Selected answers show a stronger border, filled letter marker and check in addition to colour. Desktop answers use a two-column grid; at 620px and below they become one column. Mobile layouts support 320px and above without fixed-height content boxes. Reduced-motion preference removes transitions and entrance motion. Primary dark-blue buttons always use white text; secondary and ghost buttons retain dark-blue text on light hover backgrounds.

## Restraint audit

No gradients, glass, fake statistics, feature-icon grid, rainbow themes, market charts or decorative corporate claims. The only tiled composition is the expressly requested four-personality illustration collection. Short motion supports question changes rather than delaying actions. Logo and artwork remain local and deployment-base compatible through the existing UI asset helper.
