import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../services/auth";
import "./AuthForm.css";

function AuthForm({ setIsSignedIn }) {
  const navigate = useNavigate("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validations, setValidations] = useState({
    letter: false,
    capital: false,
    number: false,
    length: false,
    matching: false,
  });

  const signUpForm = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update form data first
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);

    // Validate the password after form data update
    if (name === "password" || name === "confirmPassword") {
      validatePassword(
        updatedFormData.password,
        updatedFormData.confirmPassword
      );
    }
  };

  // Password validation logic
  const validatePassword = (password, confirmPassword) => {
    const letter = /[a-z]/g;
    const capital = /[A-Z]/g;
    const number = /[0-9]/g;

    setValidations({
      letter: letter.test(password),
      capital: capital.test(password),
      number: number.test(password),
      length: password.length >= 8,
      matching: password === confirmPassword && confirmPassword.length >= 1,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        const allTrue = (validationObject) =>
          Object.values(validationObject).every((value) => value === true);

        if (!allTrue(validations)) {
          setError("Password validation failed");
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
          setIsSignedIn(true);
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
        {isSignUp && (
          <div id="message">
            <h3>Password must contain the following:</h3>
            <p id="letter" className={validations.letter ? "valid" : "invalid"}>
              A <b>lowercase</b> letter
            </p>
            <p
              id="capital"
              className={validations.capital ? "valid" : "invalid"}
            >
              A <b>capital (uppercase)</b> letter
            </p>
            <p id="number" className={validations.number ? "valid" : "invalid"}>
              A <b>number</b>
            </p>
            <p id="length" className={validations.length ? "valid" : "invalid"}>
              Minimum <b>8 characters</b>
            </p>
            <p
              id="matching"
              className={validations.matching ? "valid" : "invalid"}
            >
              Password fields must <b>match</b>
            </p>
          </div>
        )}
      </form>
    </>
  );
}

export default AuthForm;
