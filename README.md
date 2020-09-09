# newdays

A demo of a very simple Single Page Application that only uses jQuery - no Angular; no React. Minimal functions.

Subpages are stored in the "pages" folder.

`data.json` drives most of the site and menus. The "pages" key is a list of page objects. These generate the menus and refer to pages that are loaded. The entire object can be rendered as substitute handlebars in the subpages.