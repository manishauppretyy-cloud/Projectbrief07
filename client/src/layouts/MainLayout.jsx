import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MainLayout() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <h1>Job Portal</h1>
        <p>Welcome to the Job Portal application.</p>
        <p>
          This is the main content area for my Project.
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;