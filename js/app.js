// Add loading spinner and custom cursor
$('.container').addClass('loading');
$('body').append("<div id='cursor'></div>");

// JSON get flag data
$.getJSON("https://restcountries.eu/rest/v2/all?fields=name;flag;capital;subregion;population;currencies;area;", function(countries) {
  //Create a list of flags
  let card = "<ul class='flags'>";
  $.each(countries, function(i, country) {
    card += "<li class='card'>";
    card += "<img src='" + country.flag + "'>";
    card += "<p>" + country.name + "</p>";
  });
  card += "</ul>";

  // Remove loading spinner and add footer background
  $(".container").html(card).removeClass('loading');
  $("footer").addClass('footer');

  // Append Lightbox html
  const $lightbox = $("<div class='lightbox'></div>");
  const $img = $("<img>");
  const $caption = "<div class='caption'></div>";
  $lightbox.append($img).append($caption);
  $('body').append($lightbox);


  // Open/close lightbox on click
  $('.card').click(function() {
    //Enlarge flag
    var src = $(this).contents().attr("src");
    $img.attr('src', src);

    // Add caption
    // PLS FIX THIS SECTIONS :(
    let captions = " ";
    $.each(countries, function(i, country) {
        captions += "<p> Country: " + country.name + "</p>";
        captions += "<p> Capital: " + country.capital + "</p>";
        captions += "<p> Region: " + country.subregion + "</p>";
        captions += "<p> Population: " + country.population + "</p>";
        captions += "<p> Area: " + country.area + " km</p>";
        captions += "<p> Currency: " +  country.currencies[0].name + " ( " + country.currencies[0].symbol + " )</p>";
    });
    $(".caption").html(captions);

    // Add lightbox
    $lightbox.fadeIn('slow');
  });

  $lightbox.click(function() {
    $lightbox.fadeOut('slow');
  });
});

// search box
$("#search").on('keyup', function(){
    var searchTerm = $(this).val().toLowerCase();
    $(".container").find(".card").each(function(){
        if ($(this).text().toLowerCase().indexOf(searchTerm) > -1 || searchTerm.length < 1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });              
});

// create a custom circular pointer
mouseX = function(event) {
  return event.clientX
}
mouseY = function(event) {
  return event.clientY
}
positionElement = function(event) {
  mouse = {
    h: $('#cursor').height(),
    w: $('#cursor').width(),
    x: mouseX(event),
    y: mouseY(event)
  };
  $('#cursor').css({
    top: mouse.y - mouse.h/2 + 'px',
    left: mouse.x  - mouse.w/2+ 'px'
  });
}
$(window).on('mousemove', function(event) {
  positionElement(event);
});

// Hide/show header on scroll
let previousScroll = 0;
$(window).scroll(function(){
  var currentScroll = $(this).scrollTop();
  if (currentScroll > 0 && currentScroll < $(document).height() - $(window).height()){
    if (currentScroll > previousScroll){
      window.setTimeout(hideNav, 300);
    } else {
      window.setTimeout(showNav, 300);
    }
    previousScroll = currentScroll;
  }
});
function hideNav() {
  $(".nav").removeClass("nav-visible").addClass("nav-hidden");
};
function showNav() {
  $(".nav").removeClass("nav-hidden").addClass("nav-visible");
};