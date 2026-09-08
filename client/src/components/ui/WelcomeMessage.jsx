function WelcomeMessage({ userName, projectName }) {
  return (
    <div className="welcome-message">
      <h2>Welcome, {userName} 👋</h2>
      <p>Welcome to {projectName}</p>
    </div>
  );
}

export default WelcomeMessage;