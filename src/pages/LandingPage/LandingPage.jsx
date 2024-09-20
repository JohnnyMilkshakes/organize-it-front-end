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
                <li>Step 1: Create your locations with a name and address. You'll have the ability to edit or delete it.</li>
                <li>Step 2: After creating one location or many, you can add the items that are in that site.</li>
                <li>Step 3: You can edit or delete the items, as well.</li>
              </ul>
            </div>
          )}

          {/* Conditionally rendering the about the team text */}
          {showAbout && (
            <div className="info-box">
              <h2>About the Team</h2>
              <p>
                Our team consists of passionate developers Jonathan, Wendy, and Robert.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
