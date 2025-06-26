const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// For local testing via ngrok
app.set("trust proxy", "127.0.0.1");

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // 100 req per IP
  message: { error: "Too many requests from this IP, please try again later" },
});
app.use("/api", limiter);

// Body parsing with size limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Route imports
const authRoutes = require("./routes/auth");
const repairRouter = require("./routes/repair");
const vehicleRouter = require("./routes/vehicle");
const userRouter = require("./routes/accounts/user");
const appointmentRouter = require("./routes/appointment");
const notificationRouter = require("./routes/notification");
const customerRouter = require("./routes/accounts/customer");

// Public routes
app.use("/api/auth", authRoutes);

const authMiddleware = require("./middleware/auth");
app.use(authMiddleware);

// Private/protected routes
app.use("/api/users", userRouter);
app.use("/api/repairs", repairRouter);
app.use("/api/vehicles", vehicleRouter);
app.use("/api/customers", customerRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/notifications", notificationRouter);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Error handling middleware
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;
