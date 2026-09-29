# PK — Projects & Notes

A lightweight personal portfolio for Andrew (PK), with project summaries, expandable project details, draft writing, and a short introduction.

## Editing content

- `dist/index.html` contains all project and writing content. The three project entries draw on existing warehouse automation work. The two notes are starter drafts to review before public sharing.
- `dist/styles.css` contains the responsive layout, typography, and color tokens.
- `dist/_headers` contains defensive response headers for static hosts that support this file.
- `.openai/hosting.json` identifies the hosted Site and the static output directory.

There is no build step or package installation. The `dist` folder is the complete static website. Project details and notes use native HTML disclosure elements, so they work without JavaScript. There are no contact forms, tracking scripts, external fonts, credentials, or invented social links.

The CSP also appears in the HTML to restrict resource loading when a static host does not apply `_headers`. The response-only framing directive permits the ChatGPT presentation surface.

To add a project or note, copy its existing `details` block, give it a unique `id`, and replace the text. Keep unreviewed writing labeled Draft. To add images, put the files in `dist` and refer to them with relative paths and meaningful alt text.

This first version is deployed with private access for review.

## Scroll animation

Section headings, project rows, notes, and the footer gently fade and rise as they enter the viewport. The CSS view timeline ties the effect directly to scrolling, so it reverses naturally when scrolling back up. Reduced-motion preferences, printing, keyboard focus, and section anchor links keep content immediately visible. Browsers without CSS view-timeline support show the normal static page. No JavaScript or dependencies are required.
