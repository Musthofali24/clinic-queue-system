const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const path = require("path");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

const connectDB = require("./config/db");
connectDB();

const authRoutes = require("./routes/authRoutes");
const queueRoutes = require("./routes/queueRoutes");
const clinicRoutes = require("./routes/clinicRoutes");
const viewRoutes = require("./routes/viewRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/", viewRoutes);

// Konfigurasi untuk melayani file statis
app.use(express.static(path.join(__dirname, "../frontend")));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.set("socketio", io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
