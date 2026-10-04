const getJobs = (req, res) => {
  res.json({
    success: true,
    message: "Jobs fetched successfully",
    jobs: [
      {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Solutions",
        location: "Guwahati"
      },
      {
        id: 2,
        title: "React Developer",
        company: "WebWorks",
        location: "Remote"
      }
    ]
  });
};

const getJobById = (req, res) => {
  const { id } = req.params;

  res.json({
    success: true,
    message: "Job fetched successfully",
    jobId: id
  });
};

const createJob = (req, res) => {
  res.status(201).json({
    success: true,
    message: "Job created successfully",
    job: req.body
  });
};

const updateJob = (req, res) => {
  const { id } = req.params;

  res.json({
    success: true,
    message: "Job updated successfully",
    jobId: id,
    updatedJob: req.body
  });
};

const deleteJob = (req, res) => {
  const { id } = req.params;

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