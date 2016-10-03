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
      dataType: 'html'
    }).done(function(responseData) {
      $('#jar-modal > .modal-content').html(responseData);
      $('#jar-modal').fadeIn()
    }).done(function(){
      $('#refresh').on('click', function(event){
        event.preventDefault()
        $.ajax({
          url: $(this).attr('href'),
          method: 'GET',
          data: {},
          dataType: 'json'
        }).done(function(returnData){
          if (returnData[0] === 1) {
            $('#random-item').html($('<p>').append(returnData[1]));
          } else if (returnData[0] === 2) {
            $('#random-item').html($('<img>').attr('src', returnData[1]));
            $('#random-item').append($('<p>').html(returnData[2]));
          }
        });
      });
      $('#edit').on('click', function(event){
        event.preventDefault();
        $.ajax({
          url: $(this).attr('href'),
          method: 'GET',
          data: {},
          dataType: 'html'
        }).done(function(returnData){
          $('#jar-modal > .modal-content > h1').html(returnData);
        }).done(function(){
          $('.edit_jar').on('submit', function(event){
            event.preventDefault();
            $.ajax({
              url: $(this).attr('action'),
              method:'PUT',
              data: $(this).serialize(),
              dataType: 'json'
            }).done(function(returnData){
              $('#jar-modal > .modal-content > h1').html(returnData['name']);
              $('#jar-' + returnData['id'] +' a').html(returnData['name'])
            });
          });


        });
      })
    });
  });

  $('#jar-modal').on('click', function() {
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

 });
