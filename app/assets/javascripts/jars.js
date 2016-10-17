$(function () {

  function upload() {
      $('#fileupload').fileupload({
          replaceFileInput:false,
          dataType: 'json',

          add: function (e, data) {
              data.context = $('<button/>').text('Upload')
                  .appendTo($('.form-render-field'))
                  .click(function () {
                      data.context = $('<p/>').text('Uploading...').replaceAll($(this));
                      data.submit();
                  });
          },
          done: function (e, data) {
              data.context.text('Upload finished.');
              renderMemory(data.response()['result']);
              $('#new-item-modal').fadeOut();
          }
      });
  };

  function renderMemory(returnData) {
    $('#new-item-modal').fadeOut();
    if (returnData[0] === 1) {
      $('#random-item').html($('<p>').append(returnData[1]));
    } else if (returnData[0] === 2) {
      $('#random-item').html($('<img>').attr('src', returnData[1]));
      $('#random-item').append($('<p>').html(returnData[2]));
    } else if (returnData[0] === 3) {
      $('#random-item').html($('<video>').attr('src', returnData[1]).attr('controls', true));
      $('#random-item').append($('<p>').html(returnData[2]))
    } else if (returnData[0] === 4) {
      var youtubeLink = (returnData[1]).replace('watch?v=', 'embed/');
      $('#random-item').html($('<iframe>').attr('id', 'player').attr('type', 'text/html').attr('src', youtubeLink));
    } else if (returnData[0] === 5) {
      var spotifyLink = (returnData[1]).replace('https://play.', '');
      $('#random-item').html($('<iframe>').attr('id', 'player').attr('type', 'text/html').attr('src', 'https://embed.' + spotifyLink));
    }
  }

    function submitForm() {
      $('.new_item').submit(function(event) {
        event.preventDefault()
        $.ajax({
          url: $(this).attr('action'),
          method: 'POST',
          data: $(this).serialize(),
          dataType: 'json'
        }).done(function(returnData) {
          renderMemory(returnData)
        });
      })
    }

  function form_buttons() {
    // This is the beginning of add item modal
    $('.form-button').on('click', function(event) {
      event.preventDefault();
      $.ajax({
        url: $(this).attr('href'),
        method: 'GET',
        data: {value: $(this).attr('value'), jar: $(this).attr('id')},
        dataType: 'html'
      }).done(function(returnData){
        $('.form-render-field').html(returnData);
        upload();
        submitForm();
      });
    });
  }

  function listenToJars() {

    $('.jar a').on('click', function(event) {
      event.preventDefault();
    });

    $('.jar h3').textfill({
          explicitWidth: 100, innerTag: 'a', maxFontPixels: 30,
    });

    // Renders modal
    $('.jar').on('click', function(event) {
      $('#jar-modal > .modal-content').removeClass('color1 color2 color3 color4 color5 color6 color7');
      $('#jar-modal > .modal-content').addClass($(this).attr('class'));
      $('#jar-modal > .modal-content').removeClass('jar');
      $('#new-item-modal > .modal-content').removeClass('color1 color2 color3 color4 color5 color6 color7');
      $('#new-item-modal > .modal-content').addClass($(this).attr('class'));
      $('#new-item-modal > .modal-content').removeClass('jar');
      $.ajax({
        url: $(this).find('a').attr('href'),
        method: 'GET',
        data: {},
        dataType: 'html'
      }).done(function(responseData) {
        $('#jar-modal > .modal-content').html(responseData);
        $('#jar-modal').fadeIn()
      }).done(function(){

        //  Set-up listeners for modal
        $('#refresh').on('click', function(event){
          event.preventDefault()
          $.ajax({
            url: $('#refresh').attr('href'),
            method: 'GET',
            data: {},
            dataType: 'json'
          }).done(function(returnData){
            renderMemory(returnData);
          });
        });

        // Delete the current memory
        $('#item-delete').on('click', function(event) {
          event.preventDefault()
          $.ajax({
            url: $(this).attr('href'),
            method: 'DELETE',
            data: {},
            dataType: 'html'
          }).done(function(){
            alert("Item was succesfully deleted.")
            $('#refresh').trigger('click')
          })
        })


        // Add new item to jar
        $('#new').on('click', function(event){
          event.preventDefault();
          $.ajax({
            url: $(this).attr('href'),
            method: 'GET',
            data: {},
            dataType: 'html'
          }).done(function(returnData){
            $('#new-item-modal > .modal-content').html(returnData)
            form_buttons()
            $('#new-item-modal').fadeIn()
          });
        });

        // Edit a jar info
        $('#edit').on('click', function(event){
          event.preventDefault();
          $.ajax({
            url: $(this).attr('href'),
            method: 'GET',
            data: {},
            dataType: 'html'
          }).done(function(returnData){
            $('#jar-modal > .modal-content').html(returnData);
            $('select').imagepicker()
          }).done(function(){
            $('.edit_jar').on('submit', function(event){
              event.preventDefault();
              $.ajax({
                url: $(this).attr('action'),
                method:'PUT',
                data: $(this).serialize(),
                dataType: 'html'
              }).done(function(returnData){
                $('#jar-modal > .modal-content').html(returnData);

              });
            });
          });
        });

      });
    });
  }


  $('#new-jar').on('click', function(event) {
    event.preventDefault();
    $('#new-jar-modal').fadeIn();
  });

  $('#new-jar-modal select').imagepicker();

  $('#new-jar-modal').on('click', function() {
    $('#new-jar-modal').fadeOut();
  });

  $('#new-item-modal').on('click', function() {
    $('#new-item-modal').fadeOut();
  })


  listenToJars()


  $('#jar-modal').on('click', function() {
    $(this).fadeOut();
    $('#random-item > .modal-content').html('')
  })

  $('.modal-content').on('click', function(event){
    event.stopPropagation()
  })
  //
  // $('.jar').mouseenter(function(){
  //   $(this).animate({
  //     width: '+=20'
  //   }, 250, function(){
  //   });
  // });
  //
  // $('.jar').mouseleave(function(){
  //   $(this).animate({
  //     width: '-=20'
  //   }, 250, function(){
  //   });
  // });
  // -----------------
  // NAV BAR FUNCTIONS
  // -----------------
  function replace_jars(newJars){
    $('.jar').remove();
    newJars.forEach(function(jar){
      $('#shelf-1').append($('<div class="jar">').append($('<h3>').append($('<a href=/jars/' + jar.id + '>').html(jar.name))));
    });
  };


  $('#sort-closed').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/jars/sort',
      method: 'GET',
      data: {scope: 'closed'},
      dataType: 'json'
    }).done(function(response){
      replace_jars(response);
    }).done(function(){
      listenToJars();
    });
  });

  $('#sort-recent').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/jars/sort',
      method: 'GET',
      data: {scope: 'recent'},
      dataType: 'json'
    }).done(function(response){
      replace_jars(response);
    }).done(function(){
      listenToJars();
    });
  });
});
