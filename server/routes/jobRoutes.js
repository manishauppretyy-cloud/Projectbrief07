const express = require("express");

const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} = require("../controllers/jobcontroller");

const router = express.Router();

// GET all jobs
router.get("/", getJobs);

// GET a single job by ID
router.get("/:id", getJobById);

// POST create a new job
router.post("/", createJob);

// PUT update a job
router.put("/:id", updateJob);

// DELETE a job
router.delete("/:id", deleteJob);

module.exports = router;