$(function () {
  $('#new-jar').on('click', function(event) {
    event.preventDefault();
    $('#new-jar-modal').fadeIn();
  });
  $('#new-jar-modal').on('click', function() {
    $('#new-jar-modal').fadeOut();
  });

  $('.jar a').on('click', function(event) {
    event.preventDefault();
  });

  $('.jar').on('click', function() {
    $.ajax({
      url: $(this).find('a').attr('href'),
      method: 'GET',
      data: {},
      dataType: 'json'
    }).done(function(responseData) {
      div = $('<div>')

      if (responseData[0] === 1) {
        $('<p>').html(responseData[1]).appendTo(div)
      } else if (responseData[0] === 2) {
        $('<img>').attr('src', responseData[1]).appendTo(div)
      }

      $('body').append(div)
    });
  });
 });
