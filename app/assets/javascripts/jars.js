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

  $('.jar').on('click', function(event) {

    $.ajax({
      url: $(this).find('a').attr('href'),
      method: 'GET',
      data: {},
      dataType: 'json'
    }).done(function(responseData) {
      div = $('#random-item > .modal-content');

      $('<h1>').html(responseData[1]['name']).appendTo(div)

      if (responseData[0].length === 0) {
        $('<p>').html('EMPTY').appendTo(div);
      } else if (responseData[0][0] === 1) {
        $('<p>').html(responseData[0][1]).appendTo(div);
      } else if (responseData[0][0] === 2) {
        $('<img>').attr('src', responseData[0][1]).appendTo(div);
        $('<p>').html(responseData[0][2]).appendTo(div);
      } else if (responseData[0][0] === 3) {
        $('<video>').attr('src', responseData[0][1]).attr('controls', true).attr('autoplay', 'autoplay').appendTo(div);
        $('<p>').html(responseData[0][2]).appendTo(div);
      }
      $('#random-item').append(div).fadeIn();
    });
  });

  $('#random-item').on('click', function() {
    $(this).fadeOut();
    $('#random-item > .modal-content').html('')
  })

  $('.modal-content').on('click', function(event){
    event.stopPropagation()
  })

  $('.jar').mouseenter(function(){
    $(this).animate({
      width: '+=20'
    }, 250, function(){
    });
  });

  $('.jar').mouseleave(function(){
    $(this).animate({
      width: '-=20'
    }, 250, function(){
    });
  });

  // -----------------
  // NAV BAR FUNCTIONS
  // -----------------

  $('#sort-all').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/jars',
      method: 'GET',
      data: {},
      datatype: 'JSON',
    })
  });

  $('#sort-closed').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/jars',
      method: 'GET',
      data: {},
      datatype: 'JSON',
    })
  });

  $('#sort-alpha').on('click', function(event) {
    event.preventDefault();
  });

  $('#sort-recent').on('click', function(event) {
    event.preventDefault();
  });

 });
