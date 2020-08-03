var x =[]

function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax= arr.indexOf(what)) !== -1) {
          arr.splice(ax, 1);
      }
  }
  return arr;
}

$(function () {
  $('form').submit(function(e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message',{ msg:$('#m').val(),id:socket.id});
    $('#m').val('');
  });
  socket.on('chatmessage', function(data){
    if(data.sender.id===socket.id){
      $('#messages').append($('<li>').text('you '+data.msg).addClass('you'));
    }else{
    $('#messages').append($('<li>').text(data.sender.name+' '+data.msg).addClass('notyou'));
  }});
  socket.on('joined', function(user){
    $('#messages').append($('<li>').text(user+' has joined'));
  });
  socket.on('members', function(list){

    x=list
    removeA(x,""); 
    var str = '<ul>'
    x.forEach(function(member) {
      str += '<li>'+ member + '</li>';
    }); 

    str += '</ul>';
    document.getElementById("members").innerHTML = str;
  });
  socket.on('leave', function(name){
    $('#messages').append($('<li>').text(name+' has left'));
    removeA(x, name);  
    var str='<ul>'
    x.forEach(function(member) {
      str += '<li>'+ member + '</li>';
    }); 
    str += '</ul>';
    document.getElementById("members").innerHTML = str;
  });
});