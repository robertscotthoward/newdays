
function setPageDefaults(page) {
  if (!page.text) page.text = page.id.toUpperCase();
  if (!page.url) page.url = "/pages/" + page.id + ".html?z=" + data.session;
  if (!page.background) page.background = "/images/background_" + page.id + ".jpg?z=" + data.session;
  return page;
}

// A global place to store our JSON data object.
var data = {}

function loadPage(pageId, pushHist) {
  var page = setPageDefaults(data.pages.find(x => x.id == pageId));

  if (pushHist) {
    // Keep track of the URL in the history so we can use the BACK button to go to the previous page, etc.
    window.history.pushState(
      page,
      page.text,
      window.location.origin + "#" + page.id
    );
  }

  $.get(page.url, function (html) {
    var template = Handlebars.compile(html);
    var d = { "page": page }
    html = template(d);
    $("page-content").html(html);
  });

  // Unset all "active" classes from all menu items.
  $("a[menu]").removeClass("active");

  // Set this clicked menu item to active
  $("a[menu = '" + page.id + "']").addClass("active");

  // Remove all page classes from body
  $.each(data.pages, function (i, x) {
    $("body").removeClass(x.id);
  });

  // Add the selected page class to body
  $("body").css('background-image', 'url(' + page.background + ')');

  $("[page-header]").html(page.text);
}

// This event gets called when the BACK history button is pushed.
window.onpopstate = (e) => {
  var page = e.state;
  console.log("POP " + page.id);
  loadPage(page.id, false);
}

function initSite(d) {
  data = d;

  // Generate the menu item <a> tags and stuff them in the topnav.
  var items = [];
  $.each(data.pages, function (i, x) {
    var text = x.text ?? x.id.toUpperCase();
    items.push("<a menu='" + x.id + "'>" + text + "</a>");
  });

  $("div.topnav").html(items.join(" "));

  // Wire up the click events of each a-tag
  $("a[menu]").click(function (e) {
    var pageId = e.target.getAttribute("menu");
    loadPage(pageId, true);
  });

  // This event gets called when the URL hashtag changes.
  $(window).on('hashchange',function(){ 
    var pageId = window.location.hash;
    loadPage(pageId), true;
  });

  var pageId = window.location.hash;
  if (pageId) pageId = pageId.substr(1);
  if (!pageId) pageId = data.pages[0].id;
  loadPage(pageId), true;
}

/**
 * Forces a reload of all stylesheets by appending a unique query string
 * to each stylesheet URL.
 */
function reloadStylesheets() {
  var queryString = '?reload=' + new Date().getTime();
  $('link[rel="stylesheet"][nocache]').each(function () {
      this.href = this.href.replace(/\?.*|$/, queryString);
  });
}

// Green flag in scratch. 'main' in C. Runs this first.
$(function () {
  $.getJSON("/data.json?z=" + Math.random()) // Random prevents CDN caching.
    .success(function (data) { 
      // Read in the build.txt file, that is created from the grunt command that does this:
      // git log | head > build.txt
      // so that we have the git commit id of the last change.
      // This id is used to show the most recent change and the
      $.get("/build.txt?z=" + Math.random())
        .then(text => {
          var lines = text.split('\n');
          for (var i in lines) {
            var line = lines[i];
            console.log(line);
            data['session'] = Math.floor(1000000000*Math.random());
            if (line.startsWith("commit "))
              data['commit'] = line.substring(7,17);
            else if (line.startsWith('Date: '))
              data['lastdate'] = line.substring(7);
          }
          $("div.footer").html("Version: " + data.commit +
            "<br>Build Date: " + data.lastdate).prop("title", text);
          console.log(data);
          initSite(data);
          reloadStylesheets();
        });
    })
    .error(function (e) { console.log("ERROR: Syntax in JSON?"); console.log(e); })
    .complete(function () { });
});