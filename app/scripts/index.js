'use strict';

var fb = new Firebase('https://mc-chat.firebaseio.com/');

$(document).ready(function(){
  $('.container form').submit(function(event){
    postMsg();
    event.preventDefault();
  });
  $('.chat').animate({ scrollTop: $('.chat')[0].scrollHeight });
});

function postMsg() {
  var $msg  = $('.msg').val(),
      $name = $('.name').val(),
      text  = ({ name: $name, text: $msg });

  fb.child('/messages').push(text);
  $msg.val('');
  $name.val('');
}

fb.on('child_added', function (snap) {
  var message = snap.val();
  _.forEach(message, function(info){
    var d = new Date();
    var datestamp = moment(d.getTime()).format('llll');
    var $chat = $('<p><strong>' + info.name + '</strong>' + " (" + datestamp + "): " + info.text + '</p>');
    $('.chattext').append($chat);
  })
});

