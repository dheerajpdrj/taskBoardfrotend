import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header style={{ backgroundColor: "gray", margin: 0 }}>
      <nav>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            justifyContent: "space-between",
            padding: "1rem",
            margin: 0,
          }}
        >
          <li>
            <h1
              onClick={() => navigate("/dashboard")}
              style={{
                cursor: "pointer",
                padding: "0px",
                margin: "0px",
              }}
            >
              Welcome User
            </h1>
          </li>
          <li>
            <button onClick={handleLogout} style={{ padding: ".5rem" }}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
