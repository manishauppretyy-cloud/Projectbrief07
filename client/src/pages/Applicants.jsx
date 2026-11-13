import "./Applicants.css";
import { useEffect, useState } from "react";
import {
  getApplicants,
  createApplicant,
  updateApplicant,
  deleteApplicant
} from "../services/applicantService";

function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    resume: ""
  });

  const loadApplicants = async () => {
    try {
      setError("");
      const data = await getApplicants();
      setApplicants(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplicants();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createApplicant(form);

      setForm({
        name: "",
        email: "",
        phone: "",
        jobTitle: "",
        resume: ""
      });

      await loadApplicants();
      alert("Applicant added successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateApplicant(id, {
        status: "Shortlisted"
      });

      await loadApplicants();
      alert("Applicant shortlisted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this applicant?")) {
      return;
    }

    try {
      await deleteApplicant(id);
      await loadApplicants();
      alert("Applicant deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <p>Loading applicants...</p>;
  }

  return (
    <div className="applicants-page">
      <h1>Applicants</h1>
      <p>Manage your job applicants here.</p>

      <h2>Add New Applicant</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="jobTitle"
          placeholder="Job Title"
          value={form.jobTitle}
          onChange={handleChange}
          required
        />

        <input
          name="resume"
          placeholder="Resume filename or link"
          value={form.resume}
          onChange={handleChange}
        />

        <button type="submit">Add Applicant</button>
      </form>

      <h2>Applicant List</h2>

      {error && <p>{error}</p>}

      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        applicants.map((applicant) => (
          <div key={applicant._id} className="applicant-card">
            <h3>{applicant.name}</h3>
            <p>Email: {applicant.email}</p>
            <p>Phone: {applicant.phone}</p>
            <p>Job Title: {applicant.jobTitle}</p>
            <p>Status: {applicant.status}</p>

            <button onClick={() => handleUpdate(applicant._id)}>
              Shortlist
            </button>

            <button onClick={() => handleDelete(applicant._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Applicants;
