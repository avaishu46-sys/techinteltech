import "./LoadingScreen.css";

function LoadingScreen() {
  return (
    <main className="loading-screen" role="status" aria-label="Loading TechIntel">
      <div
        className="loading-track"
        role="progressbar"
        aria-label="Loading page"
        aria-valuetext="Loading"
      >
        <div className="loading-beam">
          <span className="loading-core" />
          <span className="loading-glare" />
          <span className="loading-particle loading-particle-one" />
          <span className="loading-particle loading-particle-two" />
          <span className="loading-particle loading-particle-three" />
        </div>
      </div>
      <span className="loading-label">Loading</span>
    </main>
  );
}

export default LoadingScreen;
