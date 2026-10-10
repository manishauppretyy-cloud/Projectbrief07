const express = require("express");
const cors = require("cors");

const testRoutes = require("./routes/testRoutes");
const jobRoutes = require("./routes/jobRoutes");
const requestLogger = require("./middleware/requestLogger");

const app = express();

app.use(cors());
app.use(express.json());

// Custom middleware
app.use(requestLogger);

// Test route
app.use("/api/test", testRoutes);

// Job routes
app.use("/api/jobs", jobRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  console.error("API request failed:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

module.exports = app;
