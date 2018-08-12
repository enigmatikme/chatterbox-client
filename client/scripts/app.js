// $.ajax({
//     // This is the url you should use to communicate with the parse API server.
//     url: 'http://parse.sfm8.hackreactor.com/',
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('chatterbox: Message sent');
//     },
//     error: function (data) {
//       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Failed to send message', data);
//     }
//   });

var app = {
  // this.username = 'shawndrost',
  // this.text = 'trololo',
  // this.roomname= '4chan'
};

app.rooms = [];

app.init = function () {

  console.log(document.location.search);
};

app.send = function (message) {
  message.text = '<script>$(\'body\').css(\'background-image\', url("https://vignette.wikia.nocookie.net/harrypotter/images/1/1a/Kenneth_Branagh_as_Gilderoy-Lockhart_%286%29.jpg/revision/latest?cb=20100123194408"))</script>';
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.friendsList = function (room) {
// FIXME: finish

};
app.fetch = function (room) {

  room = room || '';
  console.log(room);
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages?order=-createdAt',
    type: 'GET',
    contentType: 'application/json',
    data: `where={"roomname": "${room}"}`,
    // data: 'where={"roomname": "lobby"}',
    success: function (data) {
      console.log('chatterbox: Message received', data);
      for (var i = 0; i < data['results'].length; i++) {
        app.renderMessage(data['results'][i]);
        if (!app.rooms.includes(data['results'][i]['roomname'])) {
          app.rooms.push(data['results'][i]['roomname']);
          console.log(data['results'][i]);
          // FIXME: finish creating rooms based on fetch
          $('.rooms').append($(`<option value=${data['results'][i].roomname}</option>`));

        }
      }
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.clearMessages = function () {
  var node = document.getElementById('chats');
  node.innerHTML = '';
};

app.renderMessage = function (message) {

  newdiv2 = document.createElement('div');
  existingdiv1 = document.getElementById('chats');

  $('#chats').append($(`<div class="msg ${message.roomname}" data-user=${message.username}><b>${message.username}</b>:<br>${message.text}</div>`));


};

app.renderRoom = function (room) {
  console.log(room);
  var node = document.createElement('div');
  node.src = room;
  document.getElementById('roomSelect').append(node);
};

app.handleUsernameClick = function () {
  $('#chats').on('click', function () {


  });
};

var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};


$(document).ready(function () {
  app.init();
  var node = document.getElementById('chatbox');
  app.fetch();
  $('.button').on('click', function () {
    var userText = $('.inputtext').val();

    var username = window.location.search.slice(10);
    $('#chats').append($(`<div class="msg" data-user=${username}><b>${username}</b><br>${userText}</div>`)); //.text(username));
    var messageObj = { username: username, text: userText, roomname: 'lobby' };
    app.send(messageObj);

  });
  $('.rooms').on('change', function () {
    var roomname = $('.rooms').val();
    app.fetch(roomname);
    console.log(roomname);
  });
});
// and click function for friends
