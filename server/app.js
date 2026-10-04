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

module.exports = app;