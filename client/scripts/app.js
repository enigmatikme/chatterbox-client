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

app.init = function() {
  console.log(document.location.search);
};

app.send = function(message) {
  $.ajax({
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json'
  });
};
app.fetch = function() {
  $.ajax({
    // url: 'http://parse.sfm8.hackreactor.com/',
    type: 'GET',
  });
};
app.clearMessages = function() {
  var node = document.getElementById('chats');
  node.innerHTML = '';
  // console.log(node);
};

app.renderMessage = function(message) {
  var node = document.createElement('div');
  node.username = message.username;
  node.src = message;
  // console.log(node);
  document.getElementById('chats').appendChild(node);
  // console.log($("chats"))
};

app.renderRoom = function(room) {
  var node = document.createElement('div');
  node.src = room;
  document.getElementById('roomSelect').append(node);
};

app.handleUsernameClick = function() {
  $('#chats').on('click', function() {
      

  });
};

var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});

