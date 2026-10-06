import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import WelcomeMessage from "../../components/ui/WelcomeMessage";
import {
  createJob as createJobRequest,
  deleteJob as deleteJobRequest,
  getJobs,
  updateJob as updateJobRequest
} from "../../services/jobService";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
  });
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getJobs()
      .then((loadedJobs) => {
        if (active) setJobs(loadedJobs);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const addJob = async () => {
    if (!newJob.title.trim() || !newJob.company.trim() || !newJob.location.trim()) {
      setError("Please fill all fields");
      return;
    }

    try {
      const job = await createJobRequest(newJob);
      setJobs((currentJobs) => [job, ...currentJobs]);
      setNotificationCount((count) => count + 1);
      setNewJob({ title: "", company: "", location: "" });
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const deleteJob = async (id) => {
    try {
      await deleteJobRequest(id);
      setJobs((currentJobs) => currentJobs.filter((job) => job.id !== id));
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      const updatedJob = await updateJobRequest(id, { status });
      setJobs((currentJobs) =>
        currentJobs.map((job) => (job.id === id ? updatedJob : job))
      );
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <section className="dashboard-page">

      {/* ==============================
          PAGE TITLE - SPRINT 9
          ============================== */}

      <div className="page-header">

        <div>

          <p className="small-title">
            DASHBOARD
          </p>

          {/* Dynamic Welcome Component using Props */}

          <WelcomeMessage
            userName="Manisha"
            projectName="JobPortal"
          />

          {/* Sprint 9 - Dynamic State */}

          <p>
            Notifications: {notificationCount}
          </p>

        </div>

      </div>


      {/* ==============================
          STATISTICS
          ============================== */}

      <div className="stats-grid">

        <Card className="stat-card">

          <span>📋</span>

          <h2>
            {jobs.length}
          </h2>

          <p>
            Total Applications
          </p>

        </Card>


        <Card className="stat-card">

          <span>⏳</span>

          <h2>
            {
              jobs.filter(
                (job) =>
                  job.status === "Applied"
              ).length
            }
          </h2>

          <p>
            Applied
          </p>

        </Card>


        <Card className="stat-card">

          <span>🎯</span>

          <h2>
            {
              jobs.filter(
                (job) =>
                  job.status === "Interview"
              ).length
            }
          </h2>

          <p>
            Interviews
          </p>

        </Card>


        <Card className="stat-card">

          <span>⭐</span>

          <h2>
            {
              jobs.filter(
                (job) =>
                  job.status === "Saved"
              ).length
            }
          </h2>

          <p>
            Saved Jobs
          </p>

        </Card>

      </div>


      {/* ==============================
          ADD JOB
          ============================== */}

      <Card
        title="Add Job Application"
        className="dashboard-card"
      >

        <div className="form-grid">

          <input
            type="text"
            placeholder="Job title"
            value={newJob.title}
            onChange={(e) =>
              setNewJob({
                ...newJob,
                title: e.target.value,
              })
            }
          />


          <input
            type="text"
            placeholder="Company"
            value={newJob.company}
            onChange={(e) =>
              setNewJob({
                ...newJob,
                company: e.target.value,
              })
            }
          />


          <input
            type="text"
            placeholder="Location"
            value={newJob.location}
            onChange={(e) =>
              setNewJob({
                ...newJob,
                location: e.target.value,
              })
            }
          />


          {/* Reusable Button */}

          <Button onClick={addJob}>
            + Add Job
          </Button>

        </div>

      </Card>

      {error && <p role="alert">{error}</p>}


      {/* ==============================
          JOB LIST - CONDITIONAL RENDERING
          ============================== */}

      <Card
        title="My Applications"
        className="dashboard-card"
      >

        <div className="card-heading">

          <span>
            {jobs.length} Jobs
          </span>

        </div>


        <div className="job-list">

          {loading ? (
            <p>Loading applications...</p>
          ) : jobs.length === 0 ? (
            <p>No job applications available.</p>
          ) : (

            jobs.map((job) => (

              <div
                className="job-item"
                key={job.id}
              >

                <div className="job-info">

                  <div className="job-icon">
                    💼
                  </div>


                  <div>

                    <h3>
                      {job.title}
                    </h3>

                    <p>
                      {job.company}
                    </p>

                    <small>
                      📍 {job.location}
                    </small>

                  </div>

                </div>


                <div className="job-actions">

                  {/* Change Application Status */}

                  <select
                    value={job.status}
                    onChange={(e) =>
                      changeStatus(
                        job.id,
                        e.target.value
                      )
                    }
                  >

                    <option value="Saved">
                      Saved
                    </option>

                    <option value="Applied">
                      Applied
                    </option>

                    <option value="Interview">
                      Interview
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                    <option value="Selected">
                      Selected
                    </option>

                  </select>


                  {/* Reusable Button */}

                  <Button
                    className="delete-btn"
                    onClick={() =>
                      deleteJob(job.id)
                    }
                  >
                    Delete
                  </Button>

                </div>

              </div>

            ))

          )}

        </div>

      </Card>

    </section>
  );
}

export default Dashboard;