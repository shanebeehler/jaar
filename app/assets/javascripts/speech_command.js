$(function () {

  if (annyang) {
    // Let's define a command.
    var commands = {
      'new jar': function() { $('#new-jar-modal').fadeIn(); }
    };

    var commands2 = {
      'close': function() { $('#new-jar-modal, #jar-modal').fadeOut();
      }
    };

    var commands3 = {
      'random': function() { $('#refresh').trigger('click'); }
    };

    var addItem = {
      'add item': function() { $('#new').trigger('click'); }
    };

    var text = {
      'text': function() { $('.form-button').attr('value', '1').trigger('click'); }
    };

    var image = {
      'image': function() { $('.form-button').attr('value', '2').trigger('click'); }
    };

    var video = {
      'video': function() { $('.form-button').attr('value', '3').trigger('click'); }
    };

    var youtube = {
      'youtube': function() { $('.form-button').attr('value', '4').trigger('click'); }
    };

    var spotify = {
      'spotify': function() { $('.form-button').attr('value', '5').trigger('click'); }
    };

    var openJar = {
      'open :jarName jar': function(jarName) { $('a:contains('+jarName+')').trigger('click'); }
    };

    var sortClosed = {
      'sort closed': function() { $('#sort-closed').trigger('click'); }
    };

    var sortRecent = {
      'sort recent': function() { $('#sort-recent').trigger('click'); }
    };

    var editProfile = {
      'edit profile': function() { $('a:contains("Profile")').trigger('click'); }
    };

    var logOut = {
      'log out': function() { $('a:contains("Log Out")').trigger('click'); }
    };

    var editJar = {
      'edit jar': function() { $('#edit').trigger('click'); }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);
    annyang.addCommands(commands2);
    annyang.addCommands(commands3);
    annyang.addCommands(addItem);
    annyang.addCommands(text);
    annyang.addCommands(image);
    annyang.addCommands(video);
    annyang.addCommands(youtube);
    annyang.addCommands(spotify);
    annyang.addCommands(openJar);
    annyang.addCommands(sortClosed);
    annyang.addCommands(sortRecent);
    annyang.addCommands(editProfile);
    annyang.addCommands(logOut);
    annyang.addCommands(editJar);

    // Start listening.
    annyang.start();
  }
});
