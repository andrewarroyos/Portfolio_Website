# Adding your portrait

The opening section has a 4:5 portrait frame beside the headline and introduction. On smaller screens, it sits between the headline and bio.

1. Save your photo in `dist`, for example `dist/portrait.jpg`. An 800 x 1000 pixel image is a good starting point.
2. In `dist/index.html`, find `src="portrait-placeholder.svg"` and change it to `src="portrait.jpg"`.
3. Change the image alt text to `Andrew Arroyos`.

The frame crops the image automatically. To adjust framing, change `object-position:50% 35%` in the `.portrait-frame img` rule in `dist/styles.css`. The second percentage controls the vertical focal point.

Use a local image path: the site's existing content security policy permits images hosted with the website. An external photo URL would also require permitting that image host in both the HTML CSP and `dist/_headers`.

Placement references reviewed: https://www.ishanpatel.dev/ and https://www.yiranhu.com/. Both pair a portrait with their opening introduction; this design adapts that placement to the portfolio's black background and blue accents.
