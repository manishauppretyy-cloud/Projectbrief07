import { Link } from "react-router-dom";
import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Home() {
  return (
    <section className="home-page">

      {/* Hero Section */}
      <div className="hero">
        <div>
          <p className="small-title">WELCOME TO JOBPORTAL</p>

          <PageTitle
            title={
              <>
                Find Your <span>Dream Job</span>
              </>
            }
            subtitle="Discover opportunities, connect with companies and build your professional career."
          />

          <div className="hero-buttons">
            <Link to="/dashboard">
              <Button className="primary">
                Explore Jobs
              </Button>
            </Link>

            <Link to="/profile">
              <Button className="secondary">
                Create Profile
              </Button>
            </Link>
          </div>
        </div>

        <Card className="hero-card">
          <div className="hero-icon">💼</div>
          <h2>Career Starts Here</h2>
          <p>Find opportunities that match your skills.</p>
        </Card>
      </div>

      {/* Features Section */}
      <div className="section">
        <h2>Why Choose JobPortal?</h2>

        <div className="feature-grid">

          <Card className="feature-card">
            <div>🔎</div>
            <h3>Find Jobs</h3>
            <p>Search for jobs that match your skills.</p>
          </Card>

          <Card className="feature-card">
            <div>👤</div>
            <h3>Build Profile</h3>
            <p>Create and update your professional profile.</p>
          </Card>

          <Card className="feature-card">
            <div>🚀</div>
            <h3>Grow Career</h3>
            <p>Apply for opportunities and grow your career.</p>
          </Card>

        </div>
      </div>

    </section>
  );
}

export default Home;