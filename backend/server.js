require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const safetyRoutes = require("./routes/safetyRoutes");
const communityRoutes = require("./routes/communityRoutes");
const packingRoutes = require("./routes/packingRoutes");
const memoryRoutes = require("./routes/memoryRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SheTravels API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/emergency-contacts", emergencyRoutes);
app.use("/api/safety", safetyRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/packing", packingRoutes);
app.use("/api/memories", memoryRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SheTravels API listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });
