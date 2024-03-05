const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const candidateRouter = require("./routes/candidates/routes");
const companyRouter = require("./routes/company/routes");
const adminRouter = require("./routes/admin/routes");
const authRouter = require("./routes/auth/routes");
const db = require("./config/db");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
dotenv.config();

// Database configuration
db.connect();

app.use("/api/candidate", candidateRouter);
app.use("/api/company", companyRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected!");
  console.log("Socket id : ", socket.id);
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    console.log("DATA : ", data.from);
    console.log("NMAE : ", data.name);
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

app.get("/", (req, res) => {
  res.send("Nodejs app started.....");
});

server.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
