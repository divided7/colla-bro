const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port=process.env.PORT || 3000;

app.use(express.static("static"));

io.on("connection", (socket) => {
  console.log(`Connected :${socket.id}`);
  socket.on("disconnect", () => console.log(`${socket.id} has disconnected`));
  socket.on("mouse", (data) => socket.broadcast.emit("mouse", data));
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
  
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
