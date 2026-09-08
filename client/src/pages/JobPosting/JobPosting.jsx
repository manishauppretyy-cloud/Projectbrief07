import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageTitle from "../../components/ui/PageTitle";

function JobPosting() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    jobType: "",
    salary: "",
    email: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedJob, setSubmittedJob] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required.";
    } else if (formData.jobTitle.trim().length < 2) {
      newErrors.jobTitle = "Job title must contain at least 2 characters.";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!formData.jobType) {
      newErrors.jobType = "Please select a job type.";
    }

    if (!formData.salary) {
      newErrors.salary = "Salary is required.";
    } else if (Number(formData.salary) <= 0) {
      newErrors.salary = "Salary must be a positive number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Job description is required.";
    } else if (formData.description.trim().length < 20) {
      newErrors.description =
        "Job description must contain at least 20 characters.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmittedJob(null);
      return;
    }

    setErrors({});
    setSubmittedJob(formData);

    setFormData({
      jobTitle: "",
      company: "",
      location: "",
      jobType: "",
      salary: "",
      email: "",
      description: "",
    });
  };

  const handleReset = () => {
    setFormData({
      jobTitle: "",
      company: "",
      location: "",
      jobType: "",
      salary: "",
      email: "",
      description: "",
    });

    setErrors({});
    setSubmittedJob(null);
  };

  return (
    <section className="job-posting-page">
      <PageTitle
        title="Post a Job"
        subtitle="Create a new job opportunity for candidates."
      />

      <Card className="form-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="jobTitle">Job Title *</label>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              placeholder="e.g. Frontend Developer"
              value={formData.jobTitle}
              onChange={handleChange}
            />
            {errors.jobTitle && (
              <p className="form-error">{errors.jobTitle}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="company">Company Name *</label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="e.g. ABC Technologies"
              value={formData.company}
              onChange={handleChange}
            />
            {errors.company && (
              <p className="form-error">{errors.company}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. Guwahati"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && (
              <p className="form-error">{errors.location}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="jobType">Job Type *</label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
            >
              <option value="">Select job type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>

            {errors.jobType && (
              <p className="form-error">{errors.jobType}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary *</label>
            <input
              id="salary"
              name="salary"
              type="number"
              min="1"
              placeholder="e.g. 30000"
              value={formData.salary}
              onChange={handleChange}
            />
            {errors.salary && (
              <p className="form-error">{errors.salary}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Contact Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. hr@company.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="form-error">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description *</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="Enter the job responsibilities and requirements..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="form-error">{errors.description}</p>
            )}
          </div>

          <div className="form-actions">
            <Button type="submit" className="primary">
              Post Job
            </Button>

            <Button
              type="button"
              className="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </form>
      </Card>

      {submittedJob && (
        <Card className="success-card">
          <h2>Job Posted Successfully! ✅</h2>
          <p>
            <strong>Job Title:</strong> {submittedJob.jobTitle}
          </p>
          <p>
            <strong>Company:</strong> {submittedJob.company}
          </p>
          <p>
            <strong>Location:</strong> {submittedJob.location}
          </p>
          <p>
            <strong>Job Type:</strong> {submittedJob.jobType}
          </p>
          <p>
            <strong>Salary:</strong> ₹{submittedJob.salary}
          </p>
          <p>
            <strong>Contact Email:</strong> {submittedJob.email}
          </p>
          <p>
            <strong>Description:</strong> {submittedJob.description}
          </p>
        </Card>
      )}
    </section>
  );
}

export default JobPosting;