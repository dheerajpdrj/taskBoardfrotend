import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setSubmitted(true);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}auth/login`,
        credentials
      );
      const { success, accessToken, user } = response.data;

      if (success) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", user);
        setToken(accessToken);
        setSubmitted(true);
        setLoginStatus("success");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setSubmitted(true);
        setLoginStatus("failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setSubmitted(true);
      setLoginStatus("error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="form-field"
            type="email"
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
          />
          {submitted && !credentials.email && (
            <span id="email-error">Please enter an email address</span>
          )}
          <input
            className="form-field"
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
          {submitted && !credentials.password && (
            <span id="password-error">Please enter a password</span>
          )}
          <button className="form-field" type="submit">
            Login
          </button>
        </form>
        <p
          style={{ cursor: "pointer", color: "green", textAlign: "center" }}
          onClick={() => navigate("/")}
        >
          Sign Up
        </p>
        {submitted && loginStatus === "failed" && (
          <div className="login-error">
            Invalid email or password. Please try again.
          </div>
        )}
        {submitted && loginStatus === "success" && (
          <div className="login-success">
            Login successful! Redirecting to the dashboard...
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
