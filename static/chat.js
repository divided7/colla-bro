$(function () {
  $('form').submit(function(e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
  socket.on('joined', function(user){
    $('#messages').append($('<li>').text(user+' has joined'));
  });
  socket.on('leave', function(name){
    $('#messages').append($('<li>').text(name+' has left'));
  });
  socket.on('members', function(list){
    list.forEach(element => {
      $('.members').append($('<li>').text(element));
    });
  });
});