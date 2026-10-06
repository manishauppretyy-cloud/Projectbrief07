const getJobs = (req, res) => {
  res.json({
    success: true,
    message: "Jobs fetched successfully",
    jobs: [
      {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Solutions",
        location: "Guwahati",
        jobType: "Full Time"
      },
      {
        id: 2,
        title: "React Developer",
        company: "WebWorks",
        location: "Remote",
        jobType: "Part Time"
      }
    ]
  });
};

const getJobById = (req, res) => {
  const { id } = req.params;

  res.json({
    success: true,
    message: "Job fetched successfully",
    job: {
      id: Number(id),
      title: "Frontend Developer",
      company: "Tech Solutions",
      location: "Guwahati",
      jobType: "Full Time"
    }
  });
};

const createJob = (req, res) => {
  const { title, company, location, jobType } = req.body;

  if (!title || !company || !location) {
    return res.status(400).json({
      success: false,
      message: "Title, company, and location are required"
    });
  }

  res.status(201).json({
    success: true,
    message: "Job created successfully",
    job: {
      id: 3,
      title,
      company,
      location,
      jobType
    }
  });
};

const updateJob = (req, res) => {
  const { id } = req.params;

  res.json({
    success: true,
    message: "Job updated successfully",
    job: {
      id: Number(id),
      ...req.body
    }
  });
};

const deleteJob = (req, res) => {
  const { id } = req.params;

  res.json({
    success: true,
    message: "Job deleted successfully",
    jobId: Number(id)
  });
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};