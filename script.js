// Add your code here


$(function() {

  $.getJSON("data.json", function(data) {
    function loadPage(pageId)
    {
      $("page-content").load("pages/home.html");
  
    }

    var items = [];
    $.each(data.pages, function(i, x) {
      var text = x.text ?? x.id.toUpperCase();
      items.push( "<a id='" + x.id + "'>" + text + "</li>" );
    });
   
    $("div.topnav").html(items.join(" "));
    loadPage("home");
  });

});