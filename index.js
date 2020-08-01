const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port=process.env.PORT || 3000;
var bodyParser = require('body-parser');
var room = '';
var username=''
var users=[];
var usernames = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static'))

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html')
})
app.post('/room',function(req,res){
  room= req.body.room
  username= req.body.name
  res.sendFile(__dirname + '/draw.html')
})

io.on("connection", (socket) => {
  socket.join(room);
  socket.to(room).emit("joined", username);
  const user=addUser(socket.id,room,username)
  console.log(`Connected :${socket.id} room: ${room} username: ${username}`);
  io.in(room).emit("members", usernames);
  socket.on("disconnect", function(){
     socket.to(user.room).emit('leave',user.name)
     console.log(`${socket.id} disconnected`);
    })


  socket.on('mouse',
  function(data) {
    // Send it to all other clients
    socket.to(room).emit('mouse', data);
  }
);
  socket.on('touch',
  function(data) {
    // Send it to all other clients
    socket.to(room).emit('touch', data);
  }
  );
  socket.on("chat message", (data) => {
    var sender=getSender(data.id)
    io.to(room).emit("chatmessage", {msg:data.msg,sender:sender});
  });
});
  
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});

function getSender(id){
  var sender={}
  users.forEach(user => {
    if (user.id==id){
      sender = user
    }
  });
  return sender
}

function addUser(id,room,name){
  var user={id:id,name:name,room:room}
  users.push(user);
  usernames.push(user.name)
  return user;
}
