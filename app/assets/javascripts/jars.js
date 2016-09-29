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
      var jar = responseData[0];
      var items = responseData[1];
      var modal = $('<div class="modall">');
      $('<h1>').html(jar['name']).appendTo(modal);

      if ( items.length === 0 ) {
        var content = $('<p>').html('This jar is empty!');
      } else {
        var randomItem = items[Math.floor(Math.random()*items.length)];
        if ( randomItem['type_id'] === 1 ) {
          var content = $('<p>').html(randomItem['comment']);
        } else if ( randomItem['type_id'] === 2 ){
          var content = $('<img>').attr('src', "/public/randomI['data_type_file_name'])
        }
      }
      modal.append(content);
      $('body').append(modal);


    });
  });
});
