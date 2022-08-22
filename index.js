const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// app.use(express.json())
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

io.on("connection", (socket) => {
  console.log("Connected", socket.id);

  socket.on("new-user", (data) => {
    socket.broadcast.emit("new-user", data);
  });

  socket.on("mousemove", coordinates => {
    socket.broadcast.emit("mousemove", {coordinates, id: socket.id})
  })
});
const PORT = process.env.PORT || 4001;

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
