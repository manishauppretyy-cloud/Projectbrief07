import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import WelcomeMessage from "../../components/ui/WelcomeMessage";

function Dashboard() {

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions",
      location: "Guwahati",
      status: "Applied",
    },
    {
      id: 2,
      title: "React Developer",
      company: "WebWorks",
      location: "Remote",
      status: "Interview",
    },
    {
      id: 3,
      title: "Junior Web Developer",
      company: "Digital Hub",
      location: "Delhi",
      status: "Saved",
    },
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
  });

  // Sprint 9 - useState
  const [notificationCount, setNotificationCount] = useState(0);

  const addJob = () => {

    if (
      !newJob.title ||
      !newJob.company ||
      !newJob.location
    ) {
      alert("Please fill all fields");
      return;
    }

    const job = {
      id: Date.now(),
      title: newJob.title,
      company: newJob.company,
      location: newJob.location,
      status: "Saved",
    };

    setJobs([...jobs, job]);

    // Update notification state
    setNotificationCount(notificationCount + 1);

    setNewJob({
      title: "",
      company: "",
      location: "",
    });

    alert("Job added successfully!");
  };

  const deleteJob = (id) => {
    setJobs(
      jobs.filter((job) => job.id !== id)
    );
  };

  const changeStatus = (id, status) => {
    setJobs(
      jobs.map((job) =>
        job.id === id
          ? { ...job, status }
          : job
      )
    );
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

          {/* Sprint 9 - Conditional Rendering */}

          {jobs.length === 0 ? (
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