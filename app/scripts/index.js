'use strict';

var fb           = new Firebase('https://mc-chat.firebaseio.com/'),
    FIREBASE_URL = 'https://mc-chat.firebaseio.com/',
    $chatBtn     = $('.chatBtn');

$(document).ready(function(){
  $chatBtn.click(postMsg);
  addChatBox();
});



function postMsg(event) {
  event.preventDefault();

  var $msg  = $('.msg').val(),
      $name = $('.name').val(),
      text  = { name: $name, text: $msg },
      data  = JSON.stringify(text);

  $.post(FIREBASE_URL + '/messages.json', data, function(res){
      addChatBox(res);
  });
}

function addChatBox() {
  $.get(FIREBASE_URL + '/messages.json', function(data){
    Object.keys(data).forEach(function(uuid){
      chatDiv(data[uuid]);
    });
  });
}

function chatDiv(msg) {
  var $chat = $('<p><strong>' + msg.name + '</strong>' + ": " + msg.text + '</p>');
  $('.chattext').append($chat);
}