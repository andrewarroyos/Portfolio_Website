# PK — Projects & Notes

A lightweight personal portfolio for Andrew (PK), with project summaries, expandable project details, draft writing, and a short introduction.

## Editing content

- `dist/index.html` contains all project and writing content. The three project entries draw on existing warehouse automation work. The two notes are starter drafts to review before public sharing.
- `dist/styles.css` contains the responsive layout, typography, and color tokens.
- `dist/_headers` contains defensive response headers for static hosts that support this file.
- `.openai/hosting.json` identifies the hosted Site and the static output directory.

There is no build step or package installation. The `dist` folder is the complete static website. Project details and notes use native HTML disclosure elements, so they work without JavaScript. The project carousel uses a small local script for mouse dragging, navigation buttons, keyboard controls, and its position indicator. It also supports native touch swiping. There are no contact forms, tracking scripts, external fonts, credentials, or invented social links.

The CSP also appears in the HTML to restrict resource loading when a static host does not apply `_headers`. The response-only framing directive permits the ChatGPT presentation surface.

To add a project or note, copy its existing `details` block, give it a unique `id`, and replace the text. Keep unreviewed writing labeled Draft. To add images, put the files in `dist` and refer to them with relative paths and meaningful alt text.

This first version is deployed with private access for review.

## Project carousel

The working site lives in `work/source` inside the Portfolio Website folder. Serve `dist` from this directory to preview it. `dist/carousel.js` handles mouse dragging, arrow buttons, and Left/Right/Home/End keys. Click a project card (or press Enter/Space on its summary) to expand its description below the card. Only one project opens at a time. Without JavaScript, cards remain horizontally scrollable and the native disclosure controls still work. Both CSP declarations allow only same-origin scripts.

Reading sections retain the scroll fade-and-rise effect. Project cards stay fully visible, and reduced-motion preferences disable the dropdown animation and smooth carousel movement.
