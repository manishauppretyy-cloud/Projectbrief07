import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MainLayout() {
  return (
    <>
      <Navbar />

      <main>
        <h1>Main Layout</h1>
        <p>This is the main content area of my project.</p>
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;