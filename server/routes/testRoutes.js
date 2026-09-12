const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Job Portal API is running successfully!");
});

module.exports = router;