import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Register = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    mobileNumber: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
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
        setRegistrationStatus("success");
        setTimeout(() => {
          setSubmitted(false);
          navigate("/login");
        }, 3000);
      } else {
        setSubmitted(true);
        setRegistrationStatus("failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setSubmitted(true);
      setRegistrationStatus("error");
    }
  };

  const formdata = ["name", "email", "mobileNumber", "password"];

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
            {formdata.map((field) => (
              <React.Fragment key={field}>
                {!submitted && (
                  <input
                    className="form-field"
                    type={field === "password" ? "password" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    value={values[field]}
                    onChange={handleInputChange}
                  />
                )}
                {submitted && !values[field] && (
                  <span id={`${field}-error`}>Please enter a {field}</span>
                )}
              </React.Fragment>
            ))}
            {!submitted && (
              <button className="form-field" type="submit">
                Register
              </button>
            )}
          </form>
          <p
            style={{ cursor: "pointer", color: "green", textAlign: "center" }}
            onClick={() => navigate("/login")}
          >
            Already a customer
          </p>
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
