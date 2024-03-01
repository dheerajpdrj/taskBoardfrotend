import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Register = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    mobileNumber: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !values.name ||
      !values.email ||
      !values.mobileNumber ||
      !values.password
    ) {
      setSubmitted(true);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}auth/signup`,
        values
      );
      if (response.data.success) {
        setSubmitted(true);
        setValid(true);
        setRegistrationStatus("success");
        setTimeout(() => {
          setSubmitted(false);
          navigate("/login");
        }, 3000);
      } else {
        setValid(false);
        setSubmitted(true);
        setRegistrationStatus("failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setValid(false);
      setSubmitted(true);
      setRegistrationStatus("error");
    }
  };

  return (
    <div className="register">
      {submitted && registrationStatus === "success" ? (
        <div className="register-success">
          Registration successful. Redirecting to login page...
        </div>
      ) : (
        <div className="form-container">
          <h1 style={{ textAlign: "center" }}>Register Form</h1>
          <form className="register-form" onSubmit={handleSubmit}>
            {!valid && (
              <input
                className="form-field"
                type="text"
                placeholder="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
              />
            )}

            {submitted && !values.name && (
              <span id="name-error">Please enter a name</span>
            )}

            {!valid && (
              <input
                className="form-field"
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
              />
            )}

            {submitted && !values.email && (
              <span id="email-error">Please enter an email address</span>
            )}

            {!valid && (
              <input
                className="form-field"
                type="text"
                placeholder="Mobile Number"
                name="mobileNumber"
                value={values.mobileNumber}
                onChange={handleInputChange}
              />
            )}

            {submitted && !values.mobileNumber && (
              <span id="mobile-number-error">Please enter a mobile number</span>
            )}

            {!valid && (
              <input
                className="form-field"
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
              />
            )}

            {submitted && !values.password && (
              <span id="password-error">Please enter a password</span>
            )}

            {!valid && (
              <button className="form-field" type="submit">
                Register
              </button>
            )}
          </form>
          <p
            style={{ cursor: "pointer", color: "green", textAlign: "center" }}
            onClick={() => navigate("/login")}
          >
            Already a costomer
          </p>
          {submitted && registrationStatus === "success" && (
            <div className="register-success">
              Registration successful. Redirecting to login page...
            </div>
          )}
          {registrationStatus === "failed" && (
            <div className="register-error">
              User already registered. Please use a different email or mobile.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Register;
