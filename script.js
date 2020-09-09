
function setPageDefaults(page) {
  if (!page.text) page.text = page.id.toUpperCase();;
  if (!page.url) page.url = "pages/" + page.id + ".html";
  if (!page.background) page.background = "images/background_" + page.id + ".jpg";
  return page;
}

$(function() {

  $.getJSON("data.json", function(data) {
    function loadPage(pageId)
    {
      var page = setPageDefaults(data.pages.find(x => x.id == pageId));

      $.get(page.url, function(html) {
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
      $.each(data.pages, function(i, x) {
        $("body").removeClass(x.id);
      });

      // Add the selected page class to body
      $("body").css('background-image', 'url(' + page.background + ')');
    }

    var items = [];
    $.each(data.pages, function(i, x) {
      var text = x.text ?? x.id.toUpperCase();
      items.push( "<a menu='" + x.id + "'>" + text + "</li>" );
    });
   
    $("div.topnav").html(items.join(" "));

    // Wire up the click events of each a-tag
    $("a[menu]").click(function (e) {
      var pageId = e.target.getAttribute("menu");
      loadPage(pageId);
    });

    loadPage("home");
  });

});