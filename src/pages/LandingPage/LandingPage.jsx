import "./LandingPage.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Navigate, Link } from "react-router-dom";

const LandingPage = ({ isSignedIn, setIsSignedIn }) => {
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
          {/* Adding buttons for Further Instructions and About the Team */}
          <div className="button-container">
            <Link to="/instructions" className="btn">
              Further Instructions
            </Link>
            <Link to="/about" className="btn">
              About the Team
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

