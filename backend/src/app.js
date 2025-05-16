const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;
