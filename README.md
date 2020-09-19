# newdays

A demo of a very simple Single Page Application that only uses jQuery - no Angular; no React. Minimal functions.

Subpages are stored in the "pages" folder.
# Data
`data.json` drives most of the site and menus. The "pages" key is a list of page objects. These generate the menus and refer to pages that are loaded. The entire object can be rendered as substitute handlebars in the subpages.

The structure of this data file is:

* pages: a list of 'page' objects to load in at runtime making the site a Single Page Application. The order determines the menu order. The first is assumed to be the home page.
* page.id: the unique identifier of the page; no spaces
* page.route: 
* page.background: 
* page.text: 
* page.url: the relative URL of the page to load. DEFAULT = "pages/{page.id}.html
* page.menu: an optional menu object that determines if the page generates a corresponding menu link.
* page.menu/text: the text to appear in the menu item. DEFAULT = uppercase(id)

# Favicon Icon
Generated here: https://www.favicon.cc then uploaded as `favicon.ico` to root web directory.

# Run as local web server
## Live Server
Automatically refreshes the web page when changes are made.
* PRECONDITIONS: Install npm
* PRECONDITIONS: Run once `npm install -g live-server`
* Go to application folder
* Run `cmd`
* Run `live-server`

## Common Server
* PRECONDITIONS: Install npm
* PRECONDITIONS: Run once `npm install -g http-server`
* Go to application folder
* Run `cmd`
* Run `http-server`

# Deploy
[Grunt](https://gruntjs.com/getting-started) is used to deploy this site via FTP to http://newdays.infinityfreeapp.com

To deploy:
* Start a Git Bash shell in the project folder.
* Install grunt CLI globally (if not already installed):
  * `npm install -g grunt-cli`
* Install a local grunt task runner:
  * `npm install grunt --save-dev`
* Install
  * `npm install grunt-ftp-push --save-dev`

npm install -g grunt-init