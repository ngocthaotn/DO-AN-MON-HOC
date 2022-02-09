$(document).ready(function() {
  var btnTop = $('#go-to-top'); 

  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 200) { 
      btnTop.addClass('show'); 
    } else {
      btnTop.removeClass('show');
    }
  });

  btnTop.on('click', function() {
    $('html, body').animate({scrollTop:0}, 800);
  });

  var header = $('#header'); 
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 100) { 
      header.addClass('show'); 
    } else {
      header.removeClass('show');
    }
  });

  $('input.typeahead').typeahead({
    name: 'countries',
    remote: 'http://localhost:3000/search?key=%QUERY',
    limit: 10
  });
});
