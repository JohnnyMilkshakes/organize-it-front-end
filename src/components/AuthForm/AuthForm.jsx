import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../services/auth";

function AuthForm({setIsSignedIn}) {
  const navigate = useNavigate("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signUpForm = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  const handleInputChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        const user = await signUp({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        if (user) {
          console.log("Sign up successful!");
          setIsSignUp(false);
        }
      } else {
        const user = await signIn({
          username: formData.username,
          password: formData.password,
        });
        if (user) {
          console.log("Log in successful!");
          setIsSignedIn(true)
          navigate("/profile");
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.", error);
    }
  };
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

        {error && <p className="error-message">{error}</p>}

        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        {isSignUp && (
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required={isSignUp}
            />
          </div>
        )}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {isSignUp && (
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>

        <p onClick={signUpForm} className="link">
          {isSignUp
            ? "Already have an account? Log In"
            : "Don’t have an account? Sign Up"}
        </p>
      </form>
    </>
  );
}

export default AuthForm;
