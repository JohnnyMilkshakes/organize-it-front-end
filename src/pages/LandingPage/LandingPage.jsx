import "./LandingPage.css";
import AuthForm from "../../components/AuthForm/AuthForm";
const LandingPage = () => {
  return (
    <div className="home-container">
      <div className="login-section">
        <AuthForm />
      </div>
      <div className="welcome-section">
        <h1>Welcome to OrganizeIt!</h1>
        <p>
          The smart way to manage your inventory. Track and stay organized with
          ease. Our user-friendly system helps you save time, reduce errors, and
          stay in control of your business. Get started with OrganizeIt and
          simplify your inventory today!
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
