const mongoose = require("mongoose");
const Job = require("../models/Job");

const serializeJob = (job) => ({
  id: job._id.toString(),
  title: job.title,
  company: job.company,
  location: job.location,
  jobType: job.jobType,
  salary: job.salary,
  email: job.email,
  description: job.description,
  status: job.status,
  createdAt: job.createdAt,
  updatedAt: job.updatedAt
});

const isValidJobId = (id) => mongoose.isValidObjectId(id);

const getJobs = async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    message: "Jobs fetched successfully",
    jobs: jobs.map(serializeJob)
  });
};

const getJobById = async (req, res) => {
  const { id } = req.params;

  if (!isValidJobId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid job ID"
    });
  }

  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found"
    });
  }

  res.json({
    success: true,
    message: "Job fetched successfully",
    job: serializeJob(job)
  });
};

const createJob = async (req, res) => {
  const { title, company, location, jobType, salary, email, description, status } = req.body;
  const job = await Job.create({
    title,
    company,
    location,
    jobType,
    salary,
    email,
    description,
    status
  });

  res.status(201).json({
    success: true,
    message: "Job created successfully",
    job: serializeJob(job)
  });
};

const updateJob = async (req, res) => {
  const { id } = req.params;

  if (!isValidJobId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid job ID"
    });
  }

  const fields = [
    "title",
    "company",
    "location",
    "jobType",
    "salary",
    "email",
    "description",
    "status"
  ];
  const updates = Object.fromEntries(
    fields.filter((field) => Object.hasOwn(req.body, field))
      .map((field) => [field, req.body[field]])
  );

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one valid job field is required"
    });
  }

  const job = await Job.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true
  });

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found"
    });
  }

  res.json({
    success: true,
    message: "Job updated successfully",
    job: serializeJob(job)
  });
};

const deleteJob = async (req, res) => {
  const { id } = req.params;

  if (!isValidJobId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid job ID"
    });
  }

  const job = await Job.findByIdAndDelete(id);
  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found"
    });
  }

  res.json({
    success: true,
    message: "Job deleted successfully",
    jobId: id
  });
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};
