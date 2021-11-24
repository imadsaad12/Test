const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./database");
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    socket.join(data);
    console.log("user joined ", socket.id, data);
  });

  socket.on("send-message", (data) => {
    socket.to(data.room).emit("recive-message", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("user disconncted ", socket.id);
  });
});
app.use(cors());
app.use(express.json());

app.get("/models", async (req, res) => {
  const allModels = await pool.query("SELECT * FROM models");
  res.json(allModels.rows);
});

app.post("/rating", async (req, res) => {
  const { id, stars, name } = req.body;

  const data = await pool.query(
    "INSERT INTO rating (model_id,stars,name) VALUES ($1,$2,$3)",
    [id, stars, name]
  );
  res.send("done");
});

app.get("/rating/:id", async (req, res) => {
  const { id } = req.params;
  const rating = await pool.query("SELECT * FROM rating WHERE model_id=$1", [
    id,
  ]);
  const customerscount = await pool.query(
    "SELECT COUNT(DISTINCT name) FROM rating WHERE model_id=$1",
    [id]
  );
  const customers = customerscount.rows[0].count;
  const ratings = rating.rows;

  res.json({ ratings, customers });
});

app.get("/comments/:id", async (req, res) => {
  const { id } = req.params;
  const allComments = await pool.query(
    "SELECT * FROM comments WHERE model_id=$1",
    [id]
  );
  res.json(allComments.rows);
});

app.get("/models/:id", async (req, res) => {
  const { id } = req.params;
  const model = await pool.query("SELECT * FROM models WHERE model_id=$1", [
    id,
  ]);
  console.log(model);
  res.json(model.rows[0]);
});

app.post("/models", async (req, res) => {
  const { name, id, body } = req.body;
  const date =
    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
  const model = await pool.query(
    "INSERT INTO comments (model_id,name,date,comment) VALUES ($1,$2,$3,$4)",
    [id, name, date, body]
  );
  res.send("comment added");
});

server.listen(4000, () => console.log("Server is running on port 4000"));
