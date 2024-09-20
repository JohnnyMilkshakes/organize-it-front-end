import "./LandingPage.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useState } from "react";

const LandingPage = ({ isSignedIn, setIsSignedIn }) => {
  // State to toggle the visibility of each text box
  const [showInstructions, setShowInstructions] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      {isSignedIn && location.pathname === "/" ? (
        <Navigate to="/profile" replace />
      ) : null}

      <div className="home-container">
        <div className="login-section">
          <AuthForm setIsSignedIn={setIsSignedIn} />
        </div>
        <div className="welcome-section">
          <h1>Welcome to OrganizeIt!</h1>
          <p>
            The smart way to manage your inventory. Track and stay organized
            with ease. Our user-friendly system helps you save time, reduce
            errors, and stay in control of your business. Get started with
            OrganizeIt and simplify your inventory today!
          </p>

          {/* Buttons for toggling content */}
          <div className="button-container">
            <button className="btn" onClick={() => setShowInstructions(!showInstructions)}>
              {showInstructions ? "Hide Instructions" : "Further Instructions"}
            </button>
            <button className="btn" onClick={() => setShowAbout(!showAbout)}>
              {showAbout ? "Hide About" : "About the Team"}
            </button>
          </div>

          {/* Conditionally rendering the instruction text */}
          {showInstructions && (
            <div className="info-box">
              <h2>Further Instructions</h2>
              <p>
                Here are the further instructions to help you get started with OrganizeIt.
                Follow the steps below to manage your inventory effectively:
              </p>
              <ul>
                <li>Step 1: Create your locations and storage areas.</li>
                <li>Step 2: Add your items to each location.</li>
                <li>Step 3: Track your inventory and manage stock levels.</li>
              </ul>
            </div>
          )}

          {/* Conditionally rendering the about the team text */}
          {showAbout && (
            <div className="info-box">
              <h2>About the Team</h2>
              <p>
                Our team consists of passionate developers and inventory experts who
                believe in simplifying the way businesses manage their inventory. We are
                committed to helping you stay organized with ease!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
