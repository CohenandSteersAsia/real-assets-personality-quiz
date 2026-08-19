# Content model

## Principle

Freeze architecture, not content. All replaceable wording and artwork references live in `src/data/`; components consume typed configuration.

## Stable identifiers

`real-estate`, `infrastructure`, `commodities`, and `natural-resources` are permanent programmatic IDs. Public names are provisional and must never be used as identifiers.

## Configuration

- `questions.ts`: question/answer wording and arbitrary score maps.
- `personalities.ts`: public names, traits, descriptions, education, artwork, and optional CTA.
- `siteContent.ts`: landing, navigation, quiz labels, results labels, sharing copy, Era of Scarcity narrative, and disclaimer.

Placeholder marketing or education copy is marked with `[PLACEHOLDER]` in source. Components must not branch on text, answer order, or public personality names.
